using Microsoft.EntityFrameworkCore.Migrations;

namespace webapi.Migrations
{
    public partial class initial : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Classrooms",
                columns: table => new
                {
                    classroomId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    classRoomName = table.Column<string>(type: "nvarchar(100)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Classrooms", x => x.classroomId);
                });

            migrationBuilder.CreateTable(
                name: "Subjects",
                columns: table => new
                {
                    subjectId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    subjectName = table.Column<string>(type: "nvarchar(100)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Subjects", x => x.subjectId);
                });

            migrationBuilder.CreateTable(
                name: "Teachers",
                columns: table => new
                {
                    teacherId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    firstName = table.Column<string>(type: "nvarchar(100)", nullable: true),
                    lastName = table.Column<string>(type: "nvarchar(100)", nullable: true),
                    mobile = table.Column<string>(type: "nvarchar(16)", nullable: true),
                    email = table.Column<string>(type: "nvarchar(100)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Teachers", x => x.teacherId);
                });

            migrationBuilder.CreateTable(
                name: "Students",
                columns: table => new
                {
                    studentId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    firstName = table.Column<string>(type: "nvarchar(100)", nullable: true),
                    lastName = table.Column<string>(type: "nvarchar(100)", nullable: true),
                    contactPerson = table.Column<string>(type: "nvarchar(100)", nullable: true),
                    mobile = table.Column<string>(type: "nvarchar(16)", nullable: true),
                    email = table.Column<string>(type: "nvarchar(100)", nullable: true),
                    dateOfBirth = table.Column<string>(type: "nvarchar(15)", nullable: true),
                    age = table.Column<int>(nullable: false),
                    classroomId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Students", x => x.studentId);
                    table.ForeignKey(
                        name: "FK_Students_Classrooms_classroomId",
                        column: x => x.classroomId,
                        principalTable: "Classrooms",
                        principalColumn: "classroomId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AllocationSubjects",
                columns: table => new
                {
                    allocationSubId = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    teacherId = table.Column<int>(nullable: false)
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
                name: "AllocationSubjectDetails",
                columns: table => new
                {
                    allocationSubDetailId = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    allocationSubId = table.Column<long>(nullable: false),
                    subjectId = table.Column<int>(nullable: false),
                    AllocationSubjectallocationSubId = table.Column<long>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AllocationSubjectDetails", x => x.allocationSubDetailId);
                    table.ForeignKey(
                        name: "FK_AllocationSubjectDetails_AllocationSubjects_AllocationSubjectallocationSubId",
                        column: x => x.AllocationSubjectallocationSubId,
                        principalTable: "AllocationSubjects",
                        principalColumn: "allocationSubId",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_AllocationSubjectDetails_Subjects_subjectId",
                        column: x => x.subjectId,
                        principalTable: "Subjects",
                        principalColumn: "subjectId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AllocationStdDetails",
                columns: table => new
                {
                    allocationStdDetailId = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    allocationStdId = table.Column<long>(nullable: false),
                    subjectId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AllocationStdDetails", x => x.allocationStdDetailId);
                    table.ForeignKey(
                        name: "FK_AllocationStdDetails_AllocationStds_allocationStdId",
                        column: x => x.allocationStdId,
                        principalTable: "AllocationStds",
                        principalColumn: "allocationStdId",
                        onDelete: ReferentialAction.Cascade);
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

            migrationBuilder.CreateIndex(
                name: "IX_AllocationSubjectDetails_AllocationSubjectallocationSubId",
                table: "AllocationSubjectDetails",
                column: "AllocationSubjectallocationSubId");

            migrationBuilder.CreateIndex(
                name: "IX_AllocationSubjectDetails_subjectId",
                table: "AllocationSubjectDetails",
                column: "subjectId");

            migrationBuilder.CreateIndex(
                name: "IX_AllocationSubjects_teacherId",
                table: "AllocationSubjects",
                column: "teacherId");

            migrationBuilder.CreateIndex(
                name: "IX_Students_classroomId",
                table: "Students",
                column: "classroomId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AllocationStdDetails");

            migrationBuilder.DropTable(
                name: "AllocationSubjectDetails");

            migrationBuilder.DropTable(
                name: "AllocationStds");

            migrationBuilder.DropTable(
                name: "AllocationSubjects");

            migrationBuilder.DropTable(
                name: "Subjects");

            migrationBuilder.DropTable(
                name: "Students");

            migrationBuilder.DropTable(
                name: "Teachers");

            migrationBuilder.DropTable(
                name: "Classrooms");
        }
    }
}
