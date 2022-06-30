using Microsoft.EntityFrameworkCore.Migrations;

namespace webapi.Migrations
{
    public partial class initial10 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AllocationSubjectDetails_AllocationSubjects_AllocationSubjectallocationSubId",
                table: "AllocationSubjectDetails");

            migrationBuilder.DropTable(
                name: "AllocationSubjects");

            migrationBuilder.DropIndex(
                name: "IX_AllocationSubjectDetails_AllocationSubjectallocationSubId",
                table: "AllocationSubjectDetails");

            migrationBuilder.DropColumn(
                name: "AllocationSubjectallocationSubId",
                table: "AllocationSubjectDetails");

            migrationBuilder.CreateTable(
                name: "AllocationSubs",
                columns: table => new
                {
                    allocationSubId = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    teacherId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AllocationSubs", x => x.allocationSubId);
                    table.ForeignKey(
                        name: "FK_AllocationSubs_Teachers_teacherId",
                        column: x => x.teacherId,
                        principalTable: "Teachers",
                        principalColumn: "teacherId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_AllocationSubjectDetails_allocationSubId",
                table: "AllocationSubjectDetails",
                column: "allocationSubId");

            migrationBuilder.CreateIndex(
                name: "IX_AllocationSubs_teacherId",
                table: "AllocationSubs",
                column: "teacherId");

            migrationBuilder.AddForeignKey(
                name: "FK_AllocationSubjectDetails_AllocationSubs_allocationSubId",
                table: "AllocationSubjectDetails",
                column: "allocationSubId",
                principalTable: "AllocationSubs",
                principalColumn: "allocationSubId",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AllocationSubjectDetails_AllocationSubs_allocationSubId",
                table: "AllocationSubjectDetails");

            migrationBuilder.DropTable(
                name: "AllocationSubs");

            migrationBuilder.DropIndex(
                name: "IX_AllocationSubjectDetails_allocationSubId",
                table: "AllocationSubjectDetails");

            migrationBuilder.AddColumn<long>(
                name: "AllocationSubjectallocationSubId",
                table: "AllocationSubjectDetails",
                type: "bigint",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "AllocationSubjects",
                columns: table => new
                {
                    allocationSubId = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    teacherId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AllocationSubjects", x => x.allocationSubId);
                    table.ForeignKey(
                        name: "FK_AllocationSubjects_Teachers_teacherId",
                        column: x => x.teacherId,
                        principalTable: "Teachers",
                        principalColumn: "teacherId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_AllocationSubjectDetails_AllocationSubjectallocationSubId",
                table: "AllocationSubjectDetails",
                column: "AllocationSubjectallocationSubId");

            migrationBuilder.CreateIndex(
                name: "IX_AllocationSubjects_teacherId",
                table: "AllocationSubjects",
                column: "teacherId");

            migrationBuilder.AddForeignKey(
                name: "FK_AllocationSubjectDetails_AllocationSubjects_AllocationSubjectallocationSubId",
                table: "AllocationSubjectDetails",
                column: "AllocationSubjectallocationSubId",
                principalTable: "AllocationSubjects",
                principalColumn: "allocationSubId",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
