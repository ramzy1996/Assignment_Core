using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace webapi.Models
{
    public class AllocationStd
    {
        [Key]
        public long allocationStdId { get; set; }
        public int studentId { get; set; }
        public Student Student { get; set; }
        public List<AllocationStdDetail> AllocationStdDetails { get; set; }

        [NotMapped]
        public string DeletedItemIds { get; set; }
    }
}
