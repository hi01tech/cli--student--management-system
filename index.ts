#! /usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";

//Define the Student class
class Student{
    static counter = 10000;
    name: string;
    id: number;
    courses: string[];
    balance: number;

    constructor (name:string){
        this.name = name;
        this.id = Student.counter ++ ;
        this.courses = [ ]; // Initializing an empty array
        this.balance = 100  ;

    }

   // Method to enroll  students
    enroll_courses (course:string){
        this.courses.push(course)
    }

    //Method to View Student Balance
    view_balance (){
        console.log(chalk.rgb(241,179,179)`\n Balance for ${this.name}: ${this.balance} $\n`);
        
    }

    //Method to Pay tution fees
    pay_fees(amount: number){
        this.balance -= amount;
        console.log(chalk.rgb(241,179,179)`\n $ ${amount} Fees paid sucessfully for ${this.name}`  );
        console.log(chalk.rgb(241,179,179)`\n Remaining Balance: $ ${this.balance}\n`  );
    }

    //Method to Show status
    show_status(){
       console.log(chalk.rgb(255,255,146) ("\n\t***** Status *****"));
       console.log( chalk.rgb(241,179,179)`\n Id: ${ this.id }`);
       console.log(chalk.rgb(241,179,179)` Name: ${ this.name }`);
       console.log(chalk.rgb(241,179,179)` Courses: ${ this.courses }`);
       console.log(chalk.rgb(241,179,179)` Balance: ${ this.balance }\n`);
       
    }
};

//  Defining Student_Manager class to range studens
class Student_Manager {
    students: Student[];

    constructor(){
        this.students = []
    }

    //Method to add new students
    add_student (name:string){
       let student = new Student (name)
       this.students.push(student)
       console.log(chalk.rgb(241,179,179)(`\n Student: ${name} added sucessfully.\n Student ID: ${student.id}\n`));
        
    }
    // Method to enroll student in a course
    enroll_student (student_id: number , course: string){
      let student = this.find_student(student_id)
      if (student){
        student.enroll_courses(course);
        console.log(chalk.rgb(241,179,179)(`\n "${student.name}" enrolled in "${course}" course sucessfully.\n`));
      }
    }
    // Method to view student balance
    view_student_balance(student_id: number){
        let student = this.find_student(student_id)
        if (student){
            student.view_balance()
        }
        else{
            console.log(chalk.rgb(255,130,42)( `\n Student not found. Please enter correct student ID\n`));
            
        }
    }
    //Method to Pay student fees
    pay_student_fees(student_id: number,amount: number){
        let student = this.find_student(student_id)
        if (student){
            student.pay_fees(amount)
        }
        else{
            console.log(chalk.rgb(255,130,42) (`\n Student not found. Please enter correct student ID\n`));
            
        }
        
    }
    // Method to dslay student status
    show_student_status(student_id: number){
        let student = this.find_student(student_id)
        if (student){
            student.show_status()
        }
        
    }
    // Method to find student by student_id
    find_student(student_id: number){
        return this.students.find(std => std.id === student_id)
    }
   
};

// Main function to run the program
async function main() {
    console.log("-".repeat(60));
    console.log(chalk.bold.rgb(255,255,146)  `\n\tWelcome to "hi01tech" Student Managment System\n`);
    console.log("-".repeat(60) + "\n");
    
    let student_manager = new Student_Manager();
    
    // While loop to keep program running
    while (true) {
        let choice= await inquirer.prompt([
            {
                name: "choice",
                type: 'list',
                message:'Select an option ',
                choices: [
                    'Add Student',
                    'Enroll Student',
                    'View Student Balance',
                    'Pay Fees',
                    'Show Status',
                    'Exit'
                ]
            }
        ])
        // Using Switch case for user choice
        switch (choice.choice) {
            case 'Add Student':
                let name_input = await inquirer.prompt([
                    {
                      name: 'name',
                      type: 'input',
                      message: 'Enter Student Name: '
                    }
                ]);
                student_manager.add_student(name_input.name);
                break;
            case 'Enroll Student':
                let course_input = await inquirer.prompt([
                    {
                      name: 'student_id',
                      type: 'number',
                      message: 'Enter Student ID: '
                    },
                    {
                        name: 'course',
                        type: 'input',
                        message: 'Enter Course Name: '
                      }
                ]);
                student_manager.enroll_student(course_input.student_id , course_input.course);
                break;
            case 'View Student Balance':
                let balance_input = await inquirer.prompt([
                    {
                      name: 'student_id',
                      type: 'number',
                      message: 'Enter Student ID: '
                    }
                ]);
                student_manager.view_student_balance(balance_input.student_id );
                break;
            case 'Pay Fees':
                let fees_input = await inquirer.prompt([
                    {
                      name: 'student_id',
                       type: 'number',
                       message: 'Enter Student ID: '
                    },
                    {
                     name: 'amount',
                     type: 'number',
                     message: 'Enter the amount to pay: '
                    }
                    ]);
                    student_manager.pay_student_fees(fees_input.student_id , fees_input.amount);
                    break;
            case 'Show Status':
                        let status_input = await inquirer.prompt([
                            {
                              name: 'student_id',
                               type: 'number',
                               message: 'Enter Student ID: '
                            }
                            ]);
                            student_manager.show_student_status(status_input.student_id );
                            break;
            case 'Exit':
            console.log(chalk.rgb(255,255,146) ("\n Exiting..."));
            process.exit();
            
        }
    }
}

// Calling a main Function
main();


