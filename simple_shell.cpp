/*
* PROGRAM NAME: simple_shell
* AUTHORS: Lloyd-Kendall Junos, Peter Valadkhan (Instructor)
* STUDENT#: 300125313
* COURSE: COMP 340
* INSTRUCTOR: Peter Valadkhan
* ASSIGNMENT: 1 PART 1
*/
#include <sys/wait.h>
#include <sys/stat.h>
#include <sys/types.h>
#include <stdlib.h>
#include <unistd.h>
#include <stdio.h>
#include <iostream>
#include <sstream>
#include <string.h>
#include <errno.h>
#include <fcntl.h>
#include <sys/syscall.h>
#include <dirent.h>

using namespace std;

//A directory entries information
//taken right from linux.die.net/man/2/getdents
struct linux_dirent {
    unsigned long  d_ino;     	// Inode number
    unsigned long  d_off;     	// Offset to next linux_dirent
    unsigned short d_reclen;  	// Length of this linux_dirent
    char           d_name[];	// Filename (null-terminated) */
                                 // length is actually (d_reclen - 2 -
                                   //offsetof(struct linux_dirent, d_name) */

    //char           pad;      	Zero padding byte
    //char           d_type;    File type (only since Linux 2.6.4;
    //                         	offset is (d_reclen - 1))

};

void type_prompt();
void read_command( string [] ); //reads a commmand and parses it into words
void cd( string args[] ); //change directory
void list(); //list directory entries
void mk( string args[] ); //make a directory
int rm( const char directory[] ); //recursive function to delete the directory and its contents
int copy( string src, string dest ); //copy file to another file
void exe( string args[] ); //execute a file
int fin( string args[] ); //kill a process with signal = 9
int pt(); //display all running processes
int compareFilenames( const char [], const char [] ); //returns 0 if filenames are the same
int openSourceFile(  const char[] ); //returns file descriptor of an existing file
int openDestFile( const char [] ); //returns file descriptor of a existing/non existing file
void copySourceToDest( int, int, char [], int ); //copies source file to destination file
int getFileSize( int fd ); //returns file size from file descriptor
bool isInteger( const char string[] ); //takes a string and returns true if it's a string of numbers

/*
* Main function
*/
int main(int argc, char *argv[]) {
    string args[5]; //contains command and its operands
    while( true ) {
        type_prompt();
        read_command( args );
        if( args[0] == "exit" ) break;
        if ( args[0] == "cd" ) cd( args );
        if ( args[0] == "list" ) list();
        if ( args[0] == "mk" ) mk( args );
        if ( args[0] == "rm" ) rm( args[1].c_str() );
        if ( args[0] == "copy" ) copy( args[1], args[2] );
        if ( args[0] == "exe" ) exe( args );
         if ( args[0] == "fin" ) fin( args );
         if ( args[0] == "pt" ) pt();
    }
    return 0;
}

/*
* FUNCTION NAME: type_prompt()
* PARAMETERS: none
* DESCRIPTION: displays "<[current_working_directory]>"
*/
void type_prompt() {
  char values[256];
  char cwd[256];
  getcwd( cwd, sizeof(cwd) );
  printf("<%s> ", cwd);
}

/*
* FUNCTION NAME: read_command
* PARAMETERS: string array
* DESCRIPTION: reads input from terminal and parses it into words
*/
void read_command( string argv[] ) {
    char commandLine[256];
    char *word;
    string cmd;
    getline(cin, cmd, '\n');
    while( cmd.size() == 0 ) {
        if( cmd.size() == 0 ) {
          type_prompt();
          getline(cin, cmd, '\n');
        }
    }
    istringstream iss(cmd);
    for ( int i = 0; i < 3; i++ ) {
        argv[i].clear();
        if (iss == NULL) continue;
        iss >> argv[i];
    }
}

/*
* FUNCTION NAME: cd
* PARAMETERS: string array
* DESCRIPTION: changes directory.
* 	Prints current working directory if no operand is provided.
*/
void cd( string argv[] ) {
    chdir( argv[1].c_str() );
    if( argv[1].empty() ) {
        char cwd[256];
          getcwd( cwd, sizeof(cwd) );
          cout << cwd << '\n';
    }
}

/*
* FUNCTION NAME: list
* PARAMETERS: none
* DESCRIPTION: opens a directory and prints each entry
* code, structs, and variable names were taken from this site: https://linux.die.net/man/2/getdents
*/
void list() {
    char cwd[256]; //current working directory.
      getcwd( cwd, sizeof(cwd) );
    int fd, nread; //file descriptor, bytes read
    int buf_size;
    struct linux_dirent *d; //Holds a directory entry's information
    int bpos; //byte position
    char d_type;

    fd = open( cwd, O_RDONLY | O_DIRECTORY );
    if (fd == -1) cout << "Error: open"; //if cwd is not a directory, error occurs
    buf_size = getFileSize( fd ); //get file size of the opened directory
    char buf[buf_size];
       do {
           //syscall() used because GNU C library doesn't provide a wrapper for getdents().
           //getdents reads a linux_dirent structure pointed to by fd into buf
        //nread = the number of bytes read into buf
        nread = syscall(SYS_getdents, fd, buf, buf_size);
          if (nread == -1) {
              cout << ("Error: getdents");
              break;
          }

        if (nread == 0) break; //end of directory
          cout << "File type\tFile name\n";
          cout << "~~~~~~~~~\t~~~~~~~~~\n";
          for (bpos = 0; bpos < nread;) { //loop until bpos is greater than the # of bytes read into buf
            d = (struct linux_dirent *) (buf + bpos); //d is assigned the linux_dirent struct stored in buf
            d_type = *(buf + bpos + d->d_reclen - 1); //get d_type
            if( d_type == DT_REG ) cout << "regular\t"; //if the file is a regular file
            if( d_type == DT_DIR ) cout << "directory"; //if the file is a directory
            cout << '\t' << d->d_name << '\n';
            bpos += d->d_reclen; //increment bpos to the next directory entry
        }
    } while( nread != 0 );
}

void mk( string argv[] ) {
    if( mkdir( argv[1].c_str(), S_IRWXU | S_IRWXG | S_IROTH | S_IXOTH) == -1 ) {
        cout << "Error: in mkdir()\n";
    }
}

/*
* FUNCTION NAME: rm
* PARAMETERS: an array of type const char
* DESCRIPTION: a recursive function to remove a directory and all of its contents, including other directories
* code, structs, and variable names were taken from this site: https://linux.die.net/man/2/getdents
* RETURN: returns a -1 if an error occured, 0 if no error occured
*/
int rm( const char dir[] ) {
    char path[500]; //the path where the directory lies
    char temp[500]; strcpy( temp, dir ); //store original path
    int fd, nread; //file descriptor, bytes read
    int buf_size;
    struct linux_dirent *d; //Holds a directory entry's information
    int bpos; //byte position
    char d_type; //directory entry type
    fd = open( dir, O_RDONLY | O_DIRECTORY );
    if (fd == -1) //if dir is not a directory, error occurs
    {
        cout << "Directory does not exist.\n";
        return -1;
    }
    buf_size = getFileSize( fd ); //get file size of the opened directory
    char buf[buf_size];
       if( rmdir(path) == -1 ) {
           do {
            //syscall() used because GNU C library doesn't provide a wrapper for getdents().
               //getdents reads a linux_dirent structure pointed to by fd into buf
            //nread = the number of bytes read into buf
            nread = syscall(SYS_getdents, fd, buf, buf_size);
              if (nread == -1)
            {
                cout << ("Error: getdents\n");
                return -1;
            }
            if (nread == 0) break; //end of directory
              for (bpos = 0; bpos < nread;) { //loop until bpos is greater than the # of bytes read into buf
                d = (struct linux_dirent *) (buf + bpos); //d is assigned the linux_dirent struct stored in buf
                d_type = *(buf + bpos + d->d_reclen - 1); //get d_type
                strcpy( path, dir ); //overwrite path to the parent directory
                strcat( path, "/" );
                  strcat( path, d->d_name );
                if( d_type == DT_DIR //Check if entry is a directory
                    && ((strcmp(d->d_name, "..") != 0)
                    && (strcmp(d->d_name, ".") != 0)) ){ //Do not attempt to remove hidden files
                      if(rmdir( path ) != 0) rm( path ); //recursively delete the entries in path;
                  }
                  if( (strcmp(d->d_name, "..") != 0)
                      && (strcmp(d->d_name, ".") != 0) )  {
                      cout << "Removing " << path <<'\n';
                    unlink( path );	//deletes the file
                }
                bpos += d->d_reclen; //increment bpos to the next directory entry
            }
        } while( nread != 0 );
       }
       cout << "Removing " << temp <<'\n';
       if (rmdir( temp ) == -1) { //remove the parent directory
           cout << "Error rmdir()\n";
       } else {
           cout << "Removal complete.\n";
           return 0;
       }
}

/*
* FUNCTION NAME: copy
* PARAMETERS: two const char arrays
* DESCRIPTION: copies an existing file to another existing/non-existing file
* 	also uses these functions: openSourceFile, openDestFile, getFileSize, copySourceToDest
* RETURN: returns -1 if an error occured, 0 otherwise
*/
int copy( string src, string dest ) {
    int sourceFD, destFD, filesize;
    if( strlen(src.c_str()) == 0 || strlen(dest.c_str()) == 0 ) { //if src or dest is empty, exit function
        cout << "Missing file operand\n";
        return -1;
    }
    if( compareFilenames( src.c_str(), dest.c_str() ) == 0 ) { //if file names are the same, exit function
        cout << "Copy failed. File names cannot be the same.\n";
        return -1;
    }
    if( (sourceFD = openSourceFile(src.c_str())) == -1 ) return -1; //returns source file descriptor
    if( (destFD = openDestFile(dest.c_str())) == -1 ) return -1; //returns destination file descriptor
    filesize = getFileSize( sourceFD ); //returns filesize of source file*/
    char buffer[filesize];
    copySourceToDest( sourceFD, destFD, buffer, filesize );	//Copies the source file to the destination file
    close(sourceFD);
    close(destFD);
    return 0;
}

/*
* FUNCTION NAME: exe
* PARAMETERS: string array
* DESCRIPTION: executes a file with a maximum of of 2 operands for the file
* REFERENCE: stackoverflow.com/questions/1919626/can-i-get-a-non-const-c-string-back-from-a-c-string
*/
void exe( string argv[] ) {
    int status;
    char arg1[50], arg2[50], arg3[50]; //holds strings for the file and its parameters
    char *newenviron[] = { NULL }; //environment variable
    //store argv values into arg1, arg2, and arg3
    strcpy( arg1, argv[1].c_str() );
    strcpy( arg2, argv[2].c_str() );
    strcpy( arg3, argv[3].c_str() );
    char *newargv[] = { arg1, arg2, arg3, NULL }; //newargv is passed to execve
    //if argv[i] is an empty string, assign newargv[i] to null
    if ( argv[1].size() == 0 ) newargv[0] = NULL;
    if ( argv[2].size() == 0 ) newargv[1] = NULL;
    if ( argv[3].size() == 0 ) newargv[2] = NULL;
    if ( fork() != 0 ) {
          //parent code
          waitpid(-1, &status, 0);
          //sleep();
    } else {
        //child code
         if( execve( newargv[0], newargv, newenviron ) == -1 ) {
            cout << "Command not valid\n";
            _exit(1);
      }
    }
}

/*
* FUNCTION NAME: fin
* PARAMETERS: string array
* DESCRIPTION: kills a process instantly with signal 9
* REFERENCE: linux.die.net/Bash-Beginners-Guide/sect_12_01.html
* RETURN: returns -1 if an error occured, 0 if no errors
*/
int fin( string args[] ) {
    pid_t pid = atoi( args[1].c_str() ); //convert string to interger
    if( strlen(args[1].c_str()) == 0 ) { //if no operand is provided, exit function
        cout << "Missing operand\n";
        return -1;
    }
    if( isInteger(args[1].c_str()) == false ) { //if the operand is not an integer, exit function
        cout << "Invalid pid\n";
        return -1;
    }
    if ( kill(pid, 9) == -1 ) {	// signal 9 will kill process immediately with no proper shutdown */
        cout << "Error in kill(). Make sure PID exists.\n";
        return -1;
    }
    return 0;
}

/*
* FUNCTION NAME: pt
* PARAMETERS: none
* DESCRIPTION: the "/proc" pseudo-filesystem provides an interface to
* 	kernal data structures. /proc/[pid]/status contains process information
*	such as process name and PID. This function opens /proc/[pid]/status and
*	searches for the string "Pid:" and "Name:" and prints the corresponding values
*	for Pid and Name.
* REFERENCES: http://man7.org/linux/man-pages/man5/proc.5.html
* https://linux.die.net/man/2/getdents64
* https://www.tutorialspoint.com/c_standard_library/c_function_strtok.htm
* https://stackoverflow.com/questions/3889992/how-does-strtok-split-the-string-into-tokens-in-c
* RETURN: returns -1 if an error occured, 0 if no errors
*/
int pt() {
    int fd, nread; //file descriptor, bytes read
    int buf_size = 4096;
    struct linux_dirent *d; //contains a directory entry's information
    int bpos; //byte position
    char d_type; //directory entry type
    fd = open( "/proc/", O_RDONLY );
    if (fd == -1) //if cwd is not a directory, error occurs
    {
        cout << "Directory does not exist.\n";
        return -1;
    }
    char buf[4096];
    do {
        //syscall() used because GNU C library doesn't provide a wrapper for getdents().
           //getdents reads a linux_dirent structure pointed to by fd into buf
        //nread = the number of bytes read into buf
        nread = syscall(SYS_getdents, fd, buf, buf_size);
        if (nread == -1) {
            cout << ("Error: getdents\n");
            return -1;
        }
        if (nread == 0) break; //end of directory
        for (bpos = 0; bpos < nread;) { //loop until bpos is greater than the # of bytes read into buf
            d = (struct linux_dirent *) (buf + bpos); //d is assigned the linux_dirent struct stored in buf
            d_type = *(buf + bpos + d->d_reclen - 1); //get d_type
            bool isProcess = isInteger( d->d_name ); //if d_name is not an integer, it's not a process
            if( isProcess ) {
                char path[100];
                strcpy( path, "/proc/" );
                strcat( path, d->d_name );
                strcat( path, "/status" ); /* proc/[pid]/status */
                FILE *fp;
                fp = fopen( path, "r" ); //open the proc/[pid]/status file
                char buff[256];
                char temp[256];
                char *word;
                /*PRINT PROCESS INFORMATION*/
                cout << "===========================\n";
                cout << "PROCESS ID AND NAME\n";
                while( fgets(buff, 256, fp) ) {
                    bool pidFound = false;
                    bool fileNameFound = false;
                    strcpy( temp, buff );
                    //strtok splits c string using ":" as a delimiter
                    for( word = strtok(buff, ":"); word != NULL; word = strtok(NULL, ":") ) {
                        if( strcmp(word, "Pid") == 0 ) { //outputs PID
                            cout << temp << '\n';
                        }
                        if( strcmp(word, "Name") == 0 ) { //outputs process name
                            cout << '\n' << temp << '\n';
                        }
                    }
                }
                cout << "===========================\n";
                fclose( fp );
            }
            bpos += d->d_reclen; //increment bpos to the next directory entry
            /*STOP PRINTING*/
        }
    } while( nread != 0 );
    return 0;
}

/*
* FUNCTION NAME: compareFilenames
* PARAMETERS: two const char arrays
* DESCRIPTION: compares two file names
* RETURN: returns 0 if the filenames are the same,
* 	< 0 if name1 < name2
*	> 0 if name1 > name2
*/
int compareFilenames( const char name1[],  const char name2[] ) {
    return strcmp( name1, name2 );
}

/*
* FUNCTION NAME: openSourceFile
* PARAMETERS: const char array
* DESCRIPTION: returns file descriptor of an existing file
* RETURN: returns an int file descriptor if successful, -1 if not
*/
int openSourceFile( const char filename[] ) {
    int fd; //File descriptor
    if( (fd = open(filename, O_WRONLY,
        S_IRUSR | S_IWUSR | S_IRGRP | S_IROTH)) != -1 ) // If fd == -1, file doesn't exist
    {
        if ((fd = open(filename, O_RDONLY | O_CREAT, //Open source file (Read only)
            S_IRUSR | S_IWUSR | S_IRGRP | S_IROTH)) == -1)
        {
            cout << "Cannot open file\n";
            return -1;
        }
    } else {
        cout << filename << " doesn't exist.\n";
        return -1;
    }
     return fd;
}

/*
* FUNCTION NAME: openDestFile
* PARAMETERS: const char array
* DESCRIPTION: returns file descriptor of a existing/non existing file
* RETURN: returns an int file descriptor if successful, -1 if not
*/
int openDestFile( const char filename[] ) {
    mode_t mode = S_IRUSR | S_IWUSR | S_IRGRP | S_IROTH;
    int fd; //file descriptor
    if ( (fd = open(filename, O_WRONLY | O_CREAT | O_TRUNC, mode)) == -1 ) { //Opening the destination file
        cout << "Cannot open file\n";
        return -1;
    }
    return fd;
}

/*
* FUNCTION NAME: copySourceToDest
* PARAMETERS: source & destination file descriptors, char buffer array, filesize of source
* DESCRIPTION: reads source file into buffer, then writes the buffer into the destination file
* RETURN: void
*/
void copySourceToDest( int sourceFD, int destFD, char buffer[], int filesize ) {
    cout << sourceFD << " " << destFD << '\n';
    ssize_t bytes_read = read( sourceFD, buffer, filesize ); //Read source file into buffer
    ssize_t bytes_written = write( destFD, buffer, bytes_read ); //Write source file into destination
}

/*
* FUNCTION NAME: getFileSize
* PARAMETERS: int file descriptor
* DESCRIPTION: obtains filesize from the filedescriptor
* REFERENCES stackoverflow.com/questions/5840148/how-can-i-get-a-files-size-in-c
* 	linux.die.net/man/2/fstat
* RETURN: returns int representing the filesize
*/
int getFileSize( int fd ) {
    struct stat buf;
    fstat( fd, &buf ); //system call returns information about a file
    int filesize = buf.st_size;
    return filesize;
}

/*
* FUNCTION NAME: isInteger
* PARAMETERS: const char array
* DESCRIPTION: takes a string and returns true if it's a string of numbers
* REFERENCES: www.tutorialspoint.com/c_standard_library/c_function_isdigit.htm
* RETURN: returns true if the string represents an interger, false otherwise
*/
bool isInteger( const char string[] ) {
    for( int i = 0; i < strlen(string); i++ ) { //loops through each character
        if( isdigit(string[i]) != 0 ) continue; //!= 0 if the character is an integer
        else return false;
    }
    return true;
}