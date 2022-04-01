using System;
using System.Collections.Generic;
using System.Drawing;
using System.Drawing.Imaging;
using System.IO;
using System.Linq;
using System.Web;
using AgendaEventos.Interfaces;
using AgendaEventos.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AgendaEventos.Controllers
{
    [ApiController]
    [Route("/events")]
    // [Authorize]
    public class EventsController : ControllerBase
    {
        private readonly IEvents _eventsService;

        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly IWebHostEnvironment _webHostEnvironment;

        public EventsController(IEvents eventsService, IHttpContextAccessor httpContextAccessor, IWebHostEnvironment webHostEnvironment)
        {
            _eventsService = eventsService;
            _httpContextAccessor = httpContextAccessor;
            _webHostEnvironment = webHostEnvironment;
        }


        [HttpPost("submit-event", Name = "SubmitEvent")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(object))]

        public object SubmitEvent([FromBody] RegisterEvents obj)
        {
            Response response = new Response();
            try
            {
                var resp = _eventsService.SaveEvent(obj);
                response.Success = true;
                response.Data = resp;
                return Ok(response);

            }
            catch (Exception e)
            {
                response.Success = false;
                response.Error = e.Message;
                return BadRequest(response);
            }
        }

        [HttpPost("update-event", Name = "UpdateEvent")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(object))]

        public object UpdateEvent([FromBody] RegisterEvents obj)
        {
            Response response = new Response();
            try
            {
                var resp = _eventsService.UpdateEvent(obj);
                response.Success = true;
                response.Data = resp;
                return Ok(response);

            }
            catch (Exception e)
            {
                response.Success = false;
                response.Error = e.Message;
                return BadRequest(response);
            }
        }

        [HttpPost("delete-event", Name = "DeleteEvent")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(object))]

        public object DeleteEvent([FromBody] RegisterEvents obj)
        {
            Response response = new Response();
            try
            {
                var resp = _eventsService.DeleteEvent(obj);
                response.Success = true;
                response.Data = resp;
                return Ok(response);

            }
            catch (Exception e)
            {
                response.Success = false;
                response.Error = e.Message;
                return BadRequest(response);
            }
        }


        [HttpPost("get-events", Name = "GetEvents")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(object))]
        public object GetEvents([FromBody] RegisterEvents obj)
        {
            Response response = new Response();
            try
            {
                Console.WriteLine("ENTROOOO");
                var resp = _eventsService.GetEvents(obj);
                response.Success = true;
                response.Data = resp;
                return Ok(response);

            }
            catch (Exception e)
            {
                response.Success = false;
                response.Error = e.Message;
                return BadRequest(response);
            }
        }

        [HttpGet("get-eventsshow", Name = "GetEventsShow")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(object))]
        public object GetEventsShow()
        {
            Response response = new Response();
            try
            {
                Console.WriteLine("ENTROOOO");
                var resp = _eventsService.GetEventsShow();
                response.Success = true;
                response.Data = resp;
                return Ok(response);

            }
            catch (Exception e)
            {
                response.Success = false;
                response.Error = e.Message;
                return BadRequest(response);
            }
        }


        [HttpGet("image/{filename}", Name = "GetImage")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(object))]
        public ActionResult GetImage(string fileName)
        {
            Response response = new Response();
            try
            {
                string wwwRootPath = _webHostEnvironment.WebRootPath + @"/Image/";
                // byte[] resp = System.IO.File.ReadAllBytes(wwwRootPath + fileName);                
                byte[] resp = System.IO.File.ReadAllBytes("Image/" + fileName);

                var extension = Path.GetExtension(wwwRootPath + fileName);
                Console.WriteLine(extension);
                return File(resp, "image/" + extension.Replace(".", ""));

            }
            catch (Exception e)
            {
                response.Success = false;
                response.Error = e.Message;
                return BadRequest(response);
            }
        }

        [HttpPost("save-documents", Name = "PostDocuments")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(object))]
        public object PostDocuments([FromForm] IFormFile files)
        {
            Response response = new Response();
            string wwwRootPath = _webHostEnvironment.WebRootPath + @"/Image/";
            string tempFileName = System.Guid.NewGuid().ToString();
            tempFileName = tempFileName + files.FileName;
            try
            {
                if (!System.IO.Directory.Exists("Image/"))
                {
                    System.IO.Directory.CreateDirectory("Image/");
                }

                string pathString = System.IO.Path.Combine("Image/", files.FileName);
                // if (!System.IO.Directory.Exists(wwwRootPath))
                // {
                //     System.IO.Directory.CreateDirectory(wwwRootPath);
                // }

                // string pathString = System.IO.Path.Combine(wwwRootPath, files.FileName);
                var filePath = Path.GetTempFileName();
                FileStream filestream = System.IO.File.Create(pathString);
                files.CopyTo(filestream);
                filestream.Flush();
                filestream.Dispose();

                response.Success = true;
                response.Data = files.FileName;
                return Ok(response.Data);

            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }
    }
}