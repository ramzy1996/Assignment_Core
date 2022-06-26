using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace webapi.Models
{
    public class Classroom
    {
        [Key]
        public int classroomId { get; set; }
        [Column(TypeName = "nvarchar(100)")]
        public string classRoomName { get; set; }
    }
}
