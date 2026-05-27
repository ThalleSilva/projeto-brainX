using BrainX.Api.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BrainX.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ChatController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ChatController(AppDbContext context)
        {
            _context = context;
        }

        // Nova rota para buscar o histórico de um usuário
        [HttpGet("sessions/{userId}")]
        public async Task<IActionResult> GetUserSessions(int userId)
        {
            var sessions = await _context.Sessions
                .Include(s => s.Messages)
                .Where(s => s.UserId == userId)
                .OrderByDescending(s => s.CreatedAt)
                .ToListAsync();

            return Ok(sessions);
        }

        [HttpPost("ask")]
        public async Task<IActionResult> AskTutor([FromBody] ChatRequest request)
        {
            var text = request.Message.ToLower();
            string replyText = "";
            bool isNewSession = false;
            StudySession session = null;
            string subject = "Geral";

            // 1. Lógica para criar uma NOVA SESSÃO
            if (request.SessionId == null && (text.Contains("estudar") || text.Contains("aprender") || text.Contains("sessão")))
            {
                if (text.Contains("c#") || text.Contains("c sharp")) subject = "C#";
                else if (text.Contains("matematica") || text.Contains("matemática")) subject = "Matemática";
                else if (text.Contains("portugues") || text.Contains("português")) subject = "Português";

                isNewSession = true;
                replyText = $"Ótima escolha! Criei uma sessão para {subject}. O que você quer saber sobre isso?";

                // Salva a nova sessão no banco
                session = new StudySession { UserId = request.UserId, Subject = subject };
                _context.Sessions.Add(session);
                await _context.SaveChangesAsync();
            }
            // 2. Lógica para responder DENTRO de uma sessão existente
            else
            {
                var knowledge = await _context.KnowledgeBase.FirstOrDefaultAsync(k => text.Contains(k.Keyword));
                
                if (knowledge != null) replyText = knowledge.Response;
                else replyText = "Interessante! Ainda estou aprendendo sobre esse tópico. Tente perguntar sobre os assuntos que te sugeri nos botões abaixo.";

                if (request.SessionId != null)
                {
                    session = await _context.Sessions.FindAsync(request.SessionId);
                }
            }

            // 3. Salvar as mensagens (do usuário e da IA) se houver uma sessão vinculada
            if (session != null)
            {
                _context.Messages.Add(new ChatMessage { StudySessionId = session.Id, Role = "user", Text = request.Message });
                _context.Messages.Add(new ChatMessage { StudySessionId = session.Id, Role = "ai", Text = replyText });
                await _context.SaveChangesAsync();
            }

            return Ok(new { 
                isNewSession = isNewSession, 
                sessionId = session?.Id,
                subject = session?.Subject,
                reply = replyText 
            });
        }
    }

    public class ChatRequest
    {
        public int UserId { get; set; }
        public int? SessionId { get; set; } // Pode ser nulo se for o primeiro contato
        public string Message { get; set; } = string.Empty;
    }
}