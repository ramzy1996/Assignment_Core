using Microsoft.EntityFrameworkCore.Migrations;

namespace webapi.Migrations
{
    public partial class initial1000 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AllocationSubjectDetails");

            migrationBuilder.CreateTable(
                name: "AllocationSubDetails",
                columns: table => new
                {
                    allocationSubDetailId = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    allocationSubId = table.Column<long>(nullable: false),
                    subjectId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AllocationSubDetails", x => x.allocationSubDetailId);
                    table.ForeignKey(
                        name: "FK_AllocationSubDetails_AllocationSubs_allocationSubId",
                        column: x => x.allocationSubId,
                        principalTable: "AllocationSubs",
                        principalColumn: "allocationSubId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AllocationSubDetails_Subjects_subjectId",
                        column: x => x.subjectId,
                        principalTable: "Subjects",
                        principalColumn: "subjectId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_AllocationSubDetails_allocationSubId",
                table: "AllocationSubDetails",
                column: "allocationSubId");

            migrationBuilder.CreateIndex(
                name: "IX_AllocationSubDetails_subjectId",
                table: "AllocationSubDetails",
                column: "subjectId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AllocationSubDetails");

            migrationBuilder.CreateTable(
                name: "AllocationSubjectDetails",
                columns: table => new
                {
                    allocationSubDetailId = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    allocationSubId = table.Column<long>(type: "bigint", nullable: false),
                    subjectId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AllocationSubjectDetails", x => x.allocationSubDetailId);
                    table.ForeignKey(
                        name: "FK_AllocationSubjectDetails_AllocationSubs_allocationSubId",
                        column: x => x.allocationSubId,
                        principalTable: "AllocationSubs",
                        principalColumn: "allocationSubId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AllocationSubjectDetails_Subjects_subjectId",
                        column: x => x.subjectId,
                        principalTable: "Subjects",
                        principalColumn: "subjectId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_AllocationSubjectDetails_allocationSubId",
                table: "AllocationSubjectDetails",
                column: "allocationSubId");

            migrationBuilder.CreateIndex(
                name: "IX_AllocationSubjectDetails_subjectId",
                table: "AllocationSubjectDetails",
                column: "subjectId");
        }
    }
}
