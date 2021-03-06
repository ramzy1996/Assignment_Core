using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using webapi.Models;

namespace webapi.Data
{
    public class AppDbContext: DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {

        }
        public DbSet<Student> Students { get; set; }
        public DbSet<Classroom> Classrooms { get; set; }
        public DbSet<Subject> Subjects { get; set; }
        public DbSet<Teacher> Teachers { get; set; }
        public DbSet<AllocationStd> AllocationStds { get; set; }
        public DbSet<AllocationStdDetail> AllocationStdDetails { get; set; } 

        //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        public DbSet<AllocationSub> AllocationSubs { get; set; }
        public DbSet<AllocationSubDetail> AllocationSubDetails { get; set; }
    }
}
