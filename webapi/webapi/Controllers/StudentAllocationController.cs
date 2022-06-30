using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using webapi.Data;
using webapi.Models;

namespace webapi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StudentAllocationController : ControllerBase
    {
        private readonly AppDbContext _context;

        public StudentAllocationController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/StudentAllocation
        [HttpGet]
        public async Task<ActionResult<IEnumerable<AllocationStd>>> GetAllocationStds()
        {
            return await _context.AllocationStds.Include(x=>x.Student).ToListAsync();
        }

        // GET: api/StudentAllocation/5
        [HttpGet("{id}")]
        public async Task<ActionResult<AllocationStd>> GetAllocationStd(long id)
        {
            var allocationStdDetails = await (from std in _context.Set<AllocationStd>()
                                      join detail in _context.Set<AllocationStdDetail>()
                                      on std.allocationStdId equals detail.allocationStdId
                                      join sub in _context.Set<Subject>()
                                      on detail.subjectId equals sub.subjectId
                                      where std.allocationStdId == id

                                      select new
                                      {
                                          std.allocationStdId,
                                          detail.allocationStdDetailId,
                                          detail.subjectId,
                                          sub.subjectName
                                      }).ToListAsync();

            var allocationStd = await (from a in _context.Set<AllocationStd>()
                                       where a.allocationStdId == id

                                       select new
                                       {
                                           a.allocationStdId,
                                           a.studentId,
                                           DeletedItemIds = "",
                                           allocationStdDetails = allocationStdDetails
                                       }).FirstOrDefaultAsync();

            if (allocationStd == null)
            {
                return NotFound();
            }

            return Ok(allocationStd);
        }

        // PUT: api/StudentAllocation/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAllocationStd(long id, AllocationStd allocationStd)
        {
            if (id != allocationStd.allocationStdId)
            {
                return BadRequest();
            }

            _context.Entry(allocationStd).State = EntityState.Modified;

            foreach (AllocationStdDetail item in allocationStd.AllocationStdDetails)
            {
                if (item.allocationStdDetailId == 0)
                    _context.AllocationStdDetails.Add(item);
                else
                    _context.Entry(item).State = EntityState.Modified;
            }

            //deleted food items
            foreach (var i in allocationStd.DeletedItemIds.Split(',').Where(x => x != ""))
            {
                AllocationStdDetail y = _context.AllocationStdDetails.Find(Convert.ToInt64(i));
                _context.AllocationStdDetails.Remove(y);
            }

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AllocationStdExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/StudentAllocation
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<AllocationStd>> PostAllocationStd(AllocationStd allocationStd)
        {
            _context.AllocationStds.Add(allocationStd);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetAllocationStd", new { id = allocationStd.allocationStdId }, allocationStd);
        }

        // DELETE: api/StudentAllocation/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<AllocationStd>> DeleteAllocationStd(long id)
        {
            var allocationStd = await _context.AllocationStds.FindAsync(id);
            if (allocationStd == null)
            {
                return NotFound();
            }

            _context.AllocationStds.Remove(allocationStd);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool AllocationStdExists(long id)
        {
            return _context.AllocationStds.Any(e => e.allocationStdId == id);
        }
    }
}
