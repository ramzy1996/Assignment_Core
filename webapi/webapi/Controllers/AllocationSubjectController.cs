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
    public class AllocationSubjectController : ControllerBase
    {
        private readonly AppDbContext _context;

        public AllocationSubjectController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/AllocationSubject
        [HttpGet]
        public async Task<ActionResult<IEnumerable<AllocationSub>>> GetAllocationSubjects()
        {
            return await _context.AllocationSubs.Include(x => x.Teacher).ToListAsync();
        }

        // GET: api/AllocationSubject/5
        [HttpGet("{id}")]
        public async Task<ActionResult<AllocationSub>> GetAllocationSubject(long id)
        {
            var allocationSubDetails = await (from alc in _context.Set<AllocationSub>()
                                              join detail in _context.Set<AllocationSubDetail>()
                                              on alc.allocationSubId equals detail.allocationSubId
                                              join sub in _context.Set<Subject>()
                                              on detail.subjectId equals sub.subjectId
                                              where alc.allocationSubId == id

                                              select new
                                              {
                                                  alc.allocationSubId,
                                                  detail.allocationSubDetailId,
                                                  detail.subjectId,
                                                  sub.subjectName
                                              }).ToListAsync();

            var allocationSub = await (from a in _context.Set<AllocationSub>()
                                       where a.allocationSubId == id

                                       select new
                                       {
                                           a.allocationSubId,
                                           a.teacherId,
                                           DeletedItemIds = "",
                                           allocationSubDetails = allocationSubDetails
                                       }).FirstOrDefaultAsync();

            if (allocationSub == null)
            {
                return NotFound();
            }

            return Ok(allocationSub);
        }

        // PUT: api/AllocationSubject/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAllocationSubject(long id, AllocationSub allocationSubject)
        {
            if (id != allocationSubject.allocationSubId)
            {
                return BadRequest();
            }

            _context.Entry(allocationSubject).State = EntityState.Modified;

            foreach (AllocationSubDetail item in allocationSubject.AllocationSubDetails)
            {
                if (item.allocationSubDetailId == 0)
                    _context.AllocationSubDetails.Add(item);
                else
                    _context.Entry(item).State = EntityState.Modified;
            }

            //deleted food items
            foreach (var i in allocationSubject.DeletedItemIds.Split(',').Where(x => x != ""))
            {
                AllocationSubDetail y = _context.AllocationSubDetails.Find(Convert.ToInt64(i));
                _context.AllocationSubDetails.Remove(y);
            }
            
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AllocationSubjectExists(id))
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

        // POST: api/AllocationSubject
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<AllocationSub>> PostAllocationSubject(AllocationSub allocationSubject)
        {
            _context.AllocationSubs.Add(allocationSubject);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetAllocationSubject", new { id = allocationSubject.allocationSubId }, allocationSubject);
        }

        // DELETE: api/AllocationSubject/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<AllocationSub>> DeleteAllocationSubject(long id)
        {
            var allocationSubject = await _context.AllocationSubs.FindAsync(id);
            if (allocationSubject == null)
            {
                return NotFound();
            }

            _context.AllocationSubs.Remove(allocationSubject);
            await _context.SaveChangesAsync();

            return allocationSubject;
        }

        private bool AllocationSubjectExists(long id)
        {
            return _context.AllocationSubs.Any(e => e.allocationSubId == id);
        }
    }
}
