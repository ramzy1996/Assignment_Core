using System.ComponentModel.DataAnnotations;

namespace webapi.Models
{
    public class AllocationSubDetail
    {
        [Key]
        public long allocationSubDetailId { get; set; }
        public long allocationSubId { get; set; }
        public int subjectId { get; set; }
        public Subject Subject { get; set; }
    }
}
