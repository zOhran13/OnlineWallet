using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SIWallet.Models;
using SIWallet.Services.TemplateService;

namespace SIWallet.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TemplateController : ControllerBase
    {

        private readonly ITemplateService _templateService;

        public TemplateController(ITemplateService templateService) {
            _templateService=templateService;
        }

        [HttpGet]
        public async Task<ActionResult<List<Template>>> GetAllTemplates()
        {
            return await _templateService.GetAllTemplates();
        }

        [HttpGet]
        [Route("{id}")]
        public async Task<ActionResult<List<Template>>> GetOneTemplate(int id)
        {
            var result=await _templateService.GetOneTemplate(id);
            if(result is null) {
                return NotFound("Sorry, this template doesn't exist.");
            }
            return Ok(result);
        }

        [HttpPost]
        public async Task<ActionResult<List<Template>>> AddTemplate([FromBody]Template template)
        {
            var result=await _templateService.AddTemplate(template);
            return Ok(result);
        }

        [HttpPut]
        [Route("{id}")]
        public async Task<ActionResult<List<Template>>> UpdateTemplate(int id, Template request)
        {
            var result=await _templateService.UpdateTemplate(id, request);
            if(result is null) {
                return NotFound("Sorry, this template doesn't exist.");
            }
            return Ok(result);
        }

        [HttpDelete]
        [Route("{id}")]
        public async Task<ActionResult<List<Template>>> DeleteTemplate(int id)
        {
            var result=await _templateService.DeleteTemplate(id);
            if(result is null) {
                return NotFound("Sorry, this template doesn't exist.");
            }
            return Ok(result);
        }
    }
}