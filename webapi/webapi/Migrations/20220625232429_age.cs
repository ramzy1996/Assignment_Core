using Microsoft.EntityFrameworkCore.Migrations;

namespace webapi.Migrations
{
    public partial class age : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "age",
                table: "Students",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(5)");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "age",
                table: "Students",
                type: "nvarchar(5)",
                nullable: false,
                oldClrType: typeof(int));
        }
    }
}
