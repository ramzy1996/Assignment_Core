using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace webapi.Models
{
    public class AllocationSub
    {
        [Key]
        public long allocationSubId { get; set; }
        public int teacherId { get; set; }
        public Teacher Teacher { get; set; }
        public List<AllocationSubDetail> AllocationSubDetails { get; set; }

        [NotMapped]
        public string DeletedItemIds { get; set; }
    }
}
