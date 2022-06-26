using Castle.MicroKernel.SubSystems.Conversion;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace webapi.Models
{
    public class Subject
    {
        [Key]
        public int subjectId { get; set; }
        [Column(TypeName = "nvarchar(100)")]
        public string subjectName { get; set; }
    }
}
