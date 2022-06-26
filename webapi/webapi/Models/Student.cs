using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace webapi.Models
{
    public class Student
    {
        [Key]
        public int studentId { get; set; }
        [Column(TypeName = "nvarchar(100)")]
        public string firstName { get; set; }
        [Column(TypeName = "nvarchar(100)")]
        public string lastName { get; set; }
        [Column(TypeName = "nvarchar(100)")]
        public string contactPerson { get; set; }
        [Column(TypeName = "nvarchar(16)")]
        public string mobile { get; set; }
        [Column(TypeName = "nvarchar(100)")]
        public string email { get; set; }
        [Column(TypeName = "nvarchar(15)")]
        public string dateOfBirth { get; set; }
        public int age { get; set; }
        public int classroomId { get; set; }
        public Classroom Classroom { get; set; }
    }
}
