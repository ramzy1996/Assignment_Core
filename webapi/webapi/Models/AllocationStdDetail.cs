using System.ComponentModel.DataAnnotations;

namespace webapi.Models
{
    public class AllocationStdDetail
    {
        [Key]
        public long allocationStdDetailId { get; set; }
        public int subjectId { get; set; }
        public Subject Subject { get; set; }
    }
}
