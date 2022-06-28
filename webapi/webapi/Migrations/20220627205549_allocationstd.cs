using Microsoft.EntityFrameworkCore.Migrations;

namespace webapi.Migrations
{
    public partial class allocationstd : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "AllocationStds",
                columns: table => new
                {
                    allocationStdId = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    studentId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AllocationStds", x => x.allocationStdId);
                    table.ForeignKey(
                        name: "FK_AllocationStds_Students_studentId",
                        column: x => x.studentId,
                        principalTable: "Students",
                        principalColumn: "studentId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AllocationStdDetails",
                columns: table => new
                {
                    allocationStdDetailId = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    subjectId = table.Column<int>(nullable: false),
                    allocationStdId = table.Column<long>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AllocationStdDetails", x => x.allocationStdDetailId);
                    table.ForeignKey(
                        name: "FK_AllocationStdDetails_AllocationStds_allocationStdId",
                        column: x => x.allocationStdId,
                        principalTable: "AllocationStds",
                        principalColumn: "allocationStdId",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_AllocationStdDetails_Subjects_subjectId",
                        column: x => x.subjectId,
                        principalTable: "Subjects",
                        principalColumn: "subjectId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_AllocationStdDetails_allocationStdId",
                table: "AllocationStdDetails",
                column: "allocationStdId");

            migrationBuilder.CreateIndex(
                name: "IX_AllocationStdDetails_subjectId",
                table: "AllocationStdDetails",
                column: "subjectId");

            migrationBuilder.CreateIndex(
                name: "IX_AllocationStds_studentId",
                table: "AllocationStds",
                column: "studentId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AllocationStdDetails");

            migrationBuilder.DropTable(
                name: "AllocationStds");
        }
    }
}
