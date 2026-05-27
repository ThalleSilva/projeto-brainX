using BrainX.Api.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BrainX.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PortfolioController : ControllerBase
    {
        private readonly AppDbContext _context;

        public PortfolioController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet("{userId}")]
        public async Task<IActionResult> GetMaterials(int userId)
        {
            var materials = await _context.Materials
                .Where(m => m.UserId == userId)
                .OrderByDescending(m => m.CreatedAt)
                .ToListAsync();

            return Ok(materials);
        }

        [HttpPost("add")]
        public async Task<IActionResult> AddMaterial([FromBody] StudyMaterial request)
        {
            _context.Materials.Add(request);
            await _context.SaveChangesAsync();
            return Ok(request);
        }

        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> DeleteMaterial([FromRoute] int id)
        {
            try 
            {
                var material = await _context.Materials.FindAsync(id);
                if (material == null) return NotFound(new { message = "Material não encontrado." });

                _context.Materials.Remove(material);
                await _context.SaveChangesAsync();
                
                return Ok(new { message = "Material excluído com sucesso." });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Erro interno no servidor ao deletar.", error = ex.Message });
            }
        }
    }
}