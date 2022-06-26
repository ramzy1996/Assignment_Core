﻿// <auto-generated />
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using webapi.Data;

namespace webapi.Migrations
{
    [DbContext(typeof(AppDbContext))]
    [Migration("20220625232429_age")]
    partial class age
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "3.1.26")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("webapi.Models.Classroom", b =>
                {
                    b.Property<int>("classroomId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("classRoomName")
                        .HasColumnType("nvarchar(100)");

                    b.HasKey("classroomId");

                    b.ToTable("Classrooms");
                });

            modelBuilder.Entity("webapi.Models.Student", b =>
                {
                    b.Property<int>("studentId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("age")
                        .HasColumnType("int");

                    b.Property<int>("classroomId")
                        .HasColumnType("int");

                    b.Property<string>("contactPerson")
                        .HasColumnType("nvarchar(100)");

                    b.Property<string>("dateOfBirth")
                        .HasColumnType("nvarchar(15)");

                    b.Property<string>("email")
                        .HasColumnType("nvarchar(100)");

                    b.Property<string>("firstName")
                        .HasColumnType("nvarchar(100)");

                    b.Property<string>("lastName")
                        .HasColumnType("nvarchar(100)");

                    b.Property<string>("mobile")
                        .HasColumnType("nvarchar(16)");

                    b.HasKey("studentId");

                    b.HasIndex("classroomId");

                    b.ToTable("Students");
                });

            modelBuilder.Entity("webapi.Models.Subject", b =>
                {
                    b.Property<int>("subjectId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("subjectName")
                        .HasColumnType("nvarchar(100)");

                    b.HasKey("subjectId");

                    b.ToTable("Subjects");
                });

            modelBuilder.Entity("webapi.Models.Teacher", b =>
                {
                    b.Property<int>("teacherId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("email")
                        .HasColumnType("nvarchar(100)");

                    b.Property<string>("firstName")
                        .HasColumnType("nvarchar(100)");

                    b.Property<string>("lastName")
                        .HasColumnType("nvarchar(100)");

                    b.Property<string>("mobile")
                        .HasColumnType("nvarchar(16)");

                    b.HasKey("teacherId");

                    b.ToTable("Teachers");
                });

            modelBuilder.Entity("webapi.Models.Student", b =>
                {
                    b.HasOne("webapi.Models.Classroom", "Classroom")
                        .WithMany()
                        .HasForeignKey("classroomId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });
#pragma warning restore 612, 618
        }
    }
}
