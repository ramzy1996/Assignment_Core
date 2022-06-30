﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using webapi.Data;

namespace webapi.Migrations
{
    [DbContext(typeof(AppDbContext))]
    [Migration("20220628204134_initial0")]
    partial class initial0
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "3.1.26")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("webapi.Models.AllocationStd", b =>
                {
                    b.Property<long>("allocationStdId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("studentId")
                        .HasColumnType("int");

                    b.HasKey("allocationStdId");

                    b.HasIndex("studentId");

                    b.ToTable("AllocationStds");
                });

            modelBuilder.Entity("webapi.Models.AllocationStdDetail", b =>
                {
                    b.Property<long>("allocationStdDetailId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<long>("allocationStdId")
                        .HasColumnType("bigint");

                    b.Property<int>("subjectId")
                        .HasColumnType("int");

                    b.HasKey("allocationStdDetailId");

                    b.HasIndex("allocationStdId");

                    b.HasIndex("subjectId");

                    b.ToTable("AllocationStdDetails");
                });

            modelBuilder.Entity("webapi.Models.AllocationSubject", b =>
                {
                    b.Property<long>("allocationSubId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("teacherId")
                        .HasColumnType("int");

                    b.HasKey("allocationSubId");

                    b.HasIndex("teacherId");

                    b.ToTable("AllocationSubjects");
                });

            modelBuilder.Entity("webapi.Models.AllocationSubjectDetail", b =>
                {
                    b.Property<long>("allocationSubDetailId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<long?>("AllocationSubjectallocationSubId")
                        .HasColumnType("bigint");

                    b.Property<long>("allocationSubId")
                        .HasColumnType("bigint");

                    b.Property<int>("subjectId")
                        .HasColumnType("int");

                    b.HasKey("allocationSubDetailId");

                    b.HasIndex("AllocationSubjectallocationSubId");

                    b.HasIndex("subjectId");

                    b.ToTable("AllocationSubjectDetails");
                });

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

            modelBuilder.Entity("webapi.Models.AllocationStd", b =>
                {
                    b.HasOne("webapi.Models.Student", "Student")
                        .WithMany()
                        .HasForeignKey("studentId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("webapi.Models.AllocationStdDetail", b =>
                {
                    b.HasOne("webapi.Models.AllocationStd", null)
                        .WithMany("AllocationStdDetails")
                        .HasForeignKey("allocationStdId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("webapi.Models.Subject", "Subject")
                        .WithMany()
                        .HasForeignKey("subjectId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("webapi.Models.AllocationSubject", b =>
                {
                    b.HasOne("webapi.Models.Teacher", "Teacher")
                        .WithMany()
                        .HasForeignKey("teacherId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("webapi.Models.AllocationSubjectDetail", b =>
                {
                    b.HasOne("webapi.Models.AllocationSubject", null)
                        .WithMany("AllocationSubjectDetail")
                        .HasForeignKey("AllocationSubjectallocationSubId");

                    b.HasOne("webapi.Models.Subject", "Subject")
                        .WithMany()
                        .HasForeignKey("subjectId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
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
