
//Program that stores phone contact information
/*
*AUTHOR: Lloyd-Kendall Junos
*CREATION DATE: Nov 21/16
*PROBLEM STATEMENT: Need to create a program similar to the phone contact application
*                   I used on my android phone. I must be able to add several pieces of
*                   information in a single contact's record. I also must be able to add
*                   and remove contacs, edit their information, sort them in alphabetical order.
*PROBLEM DESCRIPTION: user inputs names and they are stored into a vector of type struct.
*                     There are options available to display, remove, search,
*                     and sort the names alphabetically too.
*RUN DESCRIPTION: user has 8 menu options to choose from. User needs to enter commands listed on screen by
*                 using their keyboard and pressing enter after. Enter "quit" at any prompt to quit the program.
*                 Enter "end" to exit out of the module but not the program.
*				  Main Menu commands that you can type:
*                 	"add" to add a contact to storage
*					"delete" to remove a contact
*					"sort" to organize how contact names are displayed on screen
*					"search" to look up contact information in the existing records
*					"groups" to create or edit groups of members
*					"files" to save your contacts to a text file or open an existing one
*					"quit" to exit the program.
*
*/
#include <iostream>
#include <stdlib.h>
#include <string>
#include <sstream>
#include <vector>
#include <fstream>
using namespace std;

struct Person //holds phone contact info
{
    string contact, phone, email,
    house, bday, org, rShip; //org = organization; rShip = relationship
};
struct Groups //record to hold group information
{
    string groupName; //name of group
    vector<string>contacts; //holds contacts for one group
};

//function prototypes
void getName(vector<Person>& aPerson); // Obtains contact info and stores it in a vector
int addGroups(vector<Person>&data, vector<Groups>&grp, const int); //lets user group contacts into groups
int sortName(vector<Person>& aPerson, vector<Groups>&grp, bool&); // Sorts the name from A-Z or Z-A
int removeName(vector<Person>& aPerson); // Deletes a name from the vector storage
int displayNames(vector<Person>& aPerson, const int, bool, bool&); // Displays current contacts
int searchName(vector<Person>& aPerson, const int); // Searches for a record ID in storage
int editContact(vector<Person>& aPerson, int, const int); //edits record struct members;
int manageFile(vector<Person>& aPerson, const int); // opens or saves a file
int mainMenu(); // Displays main menu options and determines command
bool seeIfEmpty(vector<Person>& aPerson); // Checks if vector is empty and outputs a warning if it is
void pause(); // Used to pause the program at each function
string flipName(string); // Switches full name from surname to first.
/*
*TASK: outputs menu for user to choose commands
*ACCEPTS: nothing, its the main function
*Returns: zero
*Modifies: no pass-by-reference
*/
int main()
{
    const int FIELDSIZE = 7;
    bool runProgram = true;  //used for continuation of do-while loop
    bool justNames = false;  //used to display just names and no other user prompts
    bool defaultSort = true; //contacts by default are sorted from A-Z, first name-last name orientation
    vector<Person> aPerson;  //stores names and ages
    vector<Groups>grp;       //storage for groups
    vector<string>data;      //stores the entered names in an vector
    string fileName;

    do
    {
        switch( mainMenu() )
        {
            case 1: getName(aPerson); break;
            case 2: removeName(aPerson); break;
            case 3: displayNames(aPerson, FIELDSIZE, justNames, defaultSort); break;
            case 4: sortName(aPerson, grp, defaultSort); break;
            case 5: searchName(aPerson, FIELDSIZE); break;
            case 6: addGroups(aPerson, grp, FIELDSIZE); break;
            case 7: manageFile(aPerson, FIELDSIZE); break;
        }
    }while(runProgram == true);

    return 0;
}

/*
*TASK: Asks user to input contact info and stores it in data structure
*ACCEPTS: (1) The vector storage for the names
*RETURNS: no return because void type
*MODIFIES: The members in the Person structure holding the contact info
*/
void getName(vector<Person>& aPerson)
{
	system("cls");

    Person temp; //loads data into vector<Person>
    string choose = "yes"; //determines to loop again

    cout << "\n=======================================================================";
    cout << "\n\tADD NAME";
    cout << "\n=======================================================================\n";

    while(choose == "yes") //gets contact information.
    {
        cout << "\n\tEnter contact information. Press \"enter\" to skip field.\n\n";
        cout << "Name: ";
        getline(cin, temp.contact);
            if(temp.contact == "quit") exit(1);
        cout << "Phone: ";
        getline(cin, temp.phone);
            if(temp.phone == "quit") exit(1);
        cout << "E-mail: ";
        getline(cin, temp.email);
            if(temp.email == "quit") exit(1);
        cout << "Home address: ";
        getline(cin, temp.house);
            if(temp.house == "quit") exit(1);
        cout << "Birthday: ";
        getline(cin, temp.bday);
            if(temp.bday == "quit") exit(1);
        cout << "Organization: ";
        getline(cin, temp.org);
            if(temp.org == "quit") exit(1);
        cout << "Relationship: ";
        getline(cin, temp.rShip);
            if(temp.rShip == "quit") exit(1);
        aPerson.push_back(temp);    //store age and name into aPerson

        do
        {
            cout << "Add more? [yes|no]: ";
        getline(cin, choose); cout << endl;
        if(choose == "quit") exit(1);
        if(choose == "no") break;
        if(choose != "quit" && choose != "no" && choose != "yes")
            cout << "Invalid command. Try again:\n";
        }while(choose != "yes");

    }

    pause();
    system("cls");

}

/*
*TASK: allows user to group together contacts together. Also allows editing
*and creation of grups
*ACCEPTS: (1) The vector storage for the contact information
*         (2) the vector storage for the groups
*         (3) const int for the number of members in the Person structure
*RETURNS: no return because void type
*MODIFIES: The members in the Person structure holding the contact info
*/
int addGroups(vector<Person>&aPerson, vector<Groups>&grp, const int SIZE)
{
	system("cls");
    string choose, chooseGrp; //holds user input
    Groups tmp; //loads information into Groups struct
    bool found = false;     //indicator if an element has been found
    bool onlyNames = true;  //sends to displayNames() to only display names
    bool defaultSort;      //indicator for default orientation of names from a-z

	if(!seeIfEmpty(aPerson)) return 0;
    cout << "Current Groups: \n\n";

    if(grp.empty())
        cout << "You haven't created any groups yet.\n";

    for(int i = 0; i < grp.size(); i++)
    {
        cout << "=====" << grp[i].groupName << "=====" << endl; //displays current groups and their members
        for(int j = 0; j < grp[i].contacts.size(); j++)
            cout << grp[i].contacts[j] << endl;
    }
	do
	{
		cout << "\nEnter \"new\" to create a new group.\n"
         << "Enter \"edit\" to edit an existing group.\n\n";
    	cout << "groups> "; getline(cin, choose);
    	if(choose != "new" && choose != "edit")
    		cout << "Invalid command. Try again.\n";
    	if(choose == "end")
    	return 0; //exit module
	}while(choose != "new" && choose != "edit");

    if(choose == "new")
    {
        cout << "Group name> ";  //gets name of group
		getline(cin, tmp.groupName);
        cout << "\nChoose a contact to add to the group. \n"
             << "Enter \"end\" to stop.\n\n";
        displayNames(aPerson, SIZE, onlyNames, defaultSort); //displays names only
        cout << endl;
        while(choose != "end") //if end is entered, then loop stops
        {
            cout << "Add member[\"end\" to stop]> ";
            getline(cin, choose);
            for(int i = 0; i < aPerson.size(); i++) //this loop adds names to the group
            {
                if(choose == aPerson[i].contact)
                {
                    tmp.contacts.push_back(choose);
                    found = true;
                    break;
                }
            }
            if(found == false) cout << "Name not found. Try again or enter \"end\" to stop.\n\n";
        } grp.push_back(tmp); //store group
    }
    if(choose == "edit")
    {
        cout << "Enter the group name to edit it.\n\n";
        cout << "edit> "; getline(cin, chooseGrp);
        for(int i = 0; i < grp.size(); i++)
        {
            if(chooseGrp == grp[i].groupName)
            {
                cout << "=====" << grp[i].groupName << "=====" << endl; //header
                for(int j = 0; j < grp[i].contacts.size(); j++)
                    cout << grp[i].contacts[j] << endl;
                do
                {
                	cout << "\nEnter \"add\" to add a member.\n"
                     << "Enter \"del\" delete one.\n\n";
                	cout << "add or del> "; getline(cin, choose);
                	if(choose != "add" && choose != "del")
                		cout << "Invalid command. Try again.\n";
                	if(choose == "end")
    	                return 0; //exit module
				}while(choose != "add" && choose != "del");

                if(choose == "add")
                {
                    cout << "\nadd> "; getline(cin, choose);
                    for(int i2 = 0; i2 < aPerson.size(); i2++)
                        if(choose == aPerson[i2].contact)
                        {
                            grp[i].contacts.push_back(choose);
                            found = true; break;
                        }
                    if(found == true) break;
                    else cout << "Error: name does not exist.\n\n"; //if name not found, output this
                }
                else if(choose == "del")
                {
                    cout << "Enter the member's name to remove them from the group.\n";
                    cout << "Enter \"del [group name]\" to delete an entire group.\n\n";
                    cout << "del> "; getline(cin, choose);
                    for(int i2 = 0; i2 < aPerson.size(); i2++)
                        if(choose == aPerson[i2].contact)
                        {
                            grp[i].contacts.erase(grp[i].contacts.begin() + i2);
                            found = true; break;
                        }
                        else if(choose == "del " + grp[i2].groupName)
                        {
                            grp.erase(grp.begin() + i2);
                            found = true; break;
                        }
                    if(found == true) break;
                    else cout << "\nError: name or group does not exist.\n";
                }
            }
        }
    }
	system("cls");
}
/*
*TASK: flips name orientation around from first to last or last to first
*ACCEPTS: (1) a string to hold the name in question to be flipped
*RETURNS: returns a string, or the name that has been flipped
*MODIFIES: no modificaiton because it is a pass by value
*/
string flipName(string name)
{
    int pos, len;       //pos marks the character position; len = number of characters in string
    string last, first; //variables to store your last and first names.

    if(name.find(',') > name.length()) //flip name if there is no a comma found (name is in first-last orientation)
    {
        len = name.length();
        pos = name.find(" ");
        last = name.substr(pos + 1, len);
        first = name.substr(0, pos);
        name = last + ", " + first;
        return name;
    }
    else if(name.find(',') < name.length()) //flip name if a comma is found (name is in last-first orientation)
    {
        len = name.length();
        pos = name.find(',');
        last = name.substr(0, pos);
        first = name.substr(pos + 2, len);
        name = first + " " + last;
        return name;
    }

}
/*
*TASK: allows user to open a file and read it into the program
*      or save their contacts into a file
*ACCEPTS: (1) The vector record containing all contact info]
*         (2) A const int containing the number of members in the Person struct
*RETURNS: no return because void type
*MODIFIES: The members in the Person structure holding the contact info
*/
int manageFile(vector<Person>& aPerson, const int SIZE)
{
	system("cls");
    string fileName; //holds name of the file user inputed
    string choose;   //used to hold decision of user
    string* ptr;     //pointer used to output contact info into output filestream
    Person tmp;     //loads information into the Person structure


    cout << "\n\tFILE MANAGEMENT"; //outputs header of module
    cout << "\n=======================================================================\n\n";

    do
    {
    	cout << "Enter \"open\" to open an existing file.\n";
   		cout << "Enter \"save\" to save your current contacts\n\n";
   	    cout << "file> "; getline(cin, choose);
   	    if(choose != "open" && choose != "save")
   	    	cout << "Invalid command. Try again.\n\n";
   	    if(choose == "end")
   	    	return 0; //exit module
   	    if(choose == "quit")
   	    	exit(1); //close program
	}while(choose != "open" && choose != "save");

    if(choose == "save") //saves current contact info
    {
        cout << "\nEnter a file name with a .txt extension to save your contact.\n\n";
        cout << "Save> "; getline(cin, fileName);

        ofstream fout;
        fout.open(fileName.c_str());
        if(fout.fail())    //error message if file cannot open
        {
            cerr << "Could not open output file: " << fileName
                 << ". Program will now close.";
            pause(); exit(1);
        }
        for(int i = 0; i < aPerson.size(); i++) //save contacts
        {
            fout << aPerson[i].contact << ';';
            fout << aPerson[i].phone << ';';
            fout << aPerson[i].email << ';';
            fout << aPerson[i].house << ';';
            fout << aPerson[i].bday << ';';
            fout << aPerson[i].org << ';';
            fout << aPerson[i].rShip << ';';
        }

        cout << "\n\nSaving contacts to " << fileName << "...\n\n";
        cout << "...save complete.\n";
        fout.close();
    }
    if(choose == "open") //opens an exiting file
    {
        cout << "\nEnter filename (.txt)> ";
        getline(cin, fileName);
        ifstream fin;
        fin.open(fileName.c_str());
        if(fin.fail())    //error message if file cannot open
        {
            cerr << "Could not open output file: " << fileName
                << ". Program will now close.";
            pause(); exit(1);
        }
        cout << "Opening " << fileName << "...\n\n";
        while(!fin.eof()) //loads information into struct members
        {
            getline(fin, tmp.contact, ';');
            getline(fin, tmp.phone, ';');
            getline(fin, tmp.email, ';');
            getline(fin, tmp.house, ';');
            getline(fin, tmp.bday, ';');
            getline(fin, tmp.org, ';');
            getline(fin, tmp.rShip, '\n');
            aPerson.push_back(tmp); //stores struct members into aPerson vector
        }

        cout << aPerson[0].contact << endl;
        //aPerson.erase(aPerson.begin()); //deletes empty record

        cout << "...open complete.\n";
        fin.close();
    }
	pause();
    system("cls");

}

/*TASK: Asks user to input a name to delete from storage.
*ACCEPTS: (1) The vector storage for the names
*RETURNS: integer 0
*MODIFIES: removes a contact and all their info from the vector.
*/
int removeName(vector<Person>& aPerson)
{
	system("cls");

    string temp;       //holds the name of the person to be deleted
    bool retry = true; //used to loop prompts to user if an invalid name is entered
    bool found;        //used to indicate if the # of names in the list has been modified
    const int SIZE = 7; //number of struct Person members
    bool onlyNames = true; //tells displayNames function to only show names and nothing else
    bool defaultSort; //tells displayNames function to

    if(!seeIfEmpty(aPerson)) return 0; //exits function if vector is empty

    //outputs header
    cout << "\n\tREMOVE PERSON";
    cout << "\n=======================================================================";
    cout << "\n*Keyboard is case sensitive\n\n";

    cout << "List of Current People:\n";
    displayNames(aPerson, SIZE, onlyNames, defaultSort);

    do
    {
        cout << "\nCOMMANDS: \n";
        cout << "\nEnter the name of the person you wish to delete: ";
        cout << "\nEnter \"end\" to return to the main menu.";
        cout << "\nEnter \"delete all\" to remove all people from storage.\n";
        cout << "\ndlt> ";
		getline(cin, temp); //user input

        if (temp == "quit") exit(1); //if the entered name is quit, the program ends.
		if (temp == "end") return 0; //if end is entered, user returns to mainMenu
		if (temp == "delete all")    //if delete all is entered, all vector elements deleted
        {
            cout << "\nDeleting all names...\n\n";
            while(!aPerson.empty()) //loop will deletes all names until vector is empty
                aPerson.erase(aPerson.begin());
            cout << "...Deletion complete.\n";
            pause();
            return 0;
        }
        for(int i = 0; i < aPerson.size(); i++) //loop searches if the name is in the list. Deletes it if it is
        {
            if(temp == aPerson[i].contact)
            {
                cout << "\nDeleting " << aPerson[i].contact << "...\n";
                aPerson.erase(aPerson.begin() + i);
                found = true;  // indicates that name was in the list
                retry = false; // indicator not to loop removeName() again.
                cout << "\n...Deletion complete.\n";
            }
        }
        if (!found) //output if name wasn't in vector
            cout << "\nYou did not enter the name correctly. Remember that\n"
                 << "names are case sensitive.\n";
    }while(retry == true);

    pause(); //pauses program before the main menu dislays.
    system("cls");
    return 0;
}

/*
*TASK: Sorts the list of entered names using bubble sort algorithm.
*      Also uses substrings to swap last and first names together.
*ACCEPTS: (1) The vector storage for the contacts
*         (2) The vector storage for the groups and their members
*         (3) A boolean value to indicate whether the default A-Z
*           orientation of names should change or not. This matters
*           in the displayNames() function
*RETURNS: a 0 is returned if vector aPerson is empty or when function reaches last line
*MODIFIES: The orientation of the names stored in both of the vectors, aPerson and grp
*/
int sortName(vector<Person>& aPerson, vector<Groups>& grp, bool& defaultSort)
{
	system("cls");

    char order[256]; //used to hold input for characters 'a' and 'z'
    string temp;     //used to convert char order[] to string.
    bool firstLast = true;

    if(!seeIfEmpty(aPerson)) return 0; //if aPerson vector is empty, leave module right away;

    cout << "\n======================================================================="; //outputs header of module
    cout << "\n\tSORT NAME";
    cout << "\n=======================================================================";
    cout << "\n\tEnter 'a' to sort names from A-Z or 'z' to sort from Z-A.";
    cout << "\n\tEnter \"name\" to flip the name orientation around";
    cout << "\n\t(e.g. last to first).\n";

    do
    {
        cout << "\nsort> ";
        cin.getline(order, 256);
        temp = order; //convers character into string
        if(temp == "quit") exit(1); //if user enters "quit" string, program ends.
        if ((temp != "a") && (temp != "z") && (temp != "name"))
            cout << "Invalid command. Try again: \n";

    }while((temp != "a") && (temp != "z") && (temp != "name"));

    //Sort names A-Z
    if (temp == "a")
    {
        for(int i = 1; i < aPerson.size(); i++)
            for(int j = 0; j < aPerson.size() - 1; j++)
                if (aPerson[j].contact > aPerson[j+1].contact) swap(aPerson[j], aPerson[j+1]);
    }
    //Sort names Z-A
   if (temp == "z")
   {
       for(int i = 1; i < aPerson.size(); i++)
        for(int j=0; j < aPerson.size() - 1; j++)
            if (aPerson[j].contact < aPerson[j+1].contact) swap(aPerson[j+1], aPerson[j]);
        defaultSort = false;
   }
   //name orientation
   if(temp == "name")
   {
       for(int i = 0; i < aPerson.size(); i++) //flips contact's first and last names around
            aPerson[i].contact = flipName(aPerson[i].contact);
        for(int i = 0; i < grp.size(); i++)
            for(int i2 = 0; i2 < grp[i].contacts.size(); i2++) //flips contact's last and first names in all groups names
                grp[i].contacts[i2] = flipName(grp[i].contacts[i2]);
   }

    pause(); //program is paused before the main menu appears
	system("cls");
    return 0;
}

/*
*TASK: displays named stored in aPerson vector.
*ACCEPTS: (1) The vector storage to access the names
*	      (2) a const int to indicate how many members are in struct Person
*         (3) a booleon value, onlyNames, indicating to only display names and not ask for further input
*             or run the entire module
*RETURNS: integer 0 if the aPerson vector storage is empty
*MODIFIES: nothing is modified because the function doesn't change
the values of the vector or the number of elements; only displays them.
*/
int displayNames(vector<Person>& aPerson, const int SIZE, bool onlyNames, bool& defaultSort)
{
    system("cls");
    string heading; //holds heading of displayed names
    int tmp; //variable is used as an indicator to stop outputting comments(see comments below)
    bool leave = false;

	if(!seeIfEmpty(aPerson)) return 0;

    if(defaultSort == true) //bubble sort if default name orientation is true
        for(int i = 1; i < aPerson.size(); i++)
            for(int j = 0; j < aPerson.size() - 1; j++)
                if (aPerson[j].contact > aPerson[j+1].contact) swap(aPerson[j], aPerson[j+1]);

    cout << "\n\tCONTACTS"; //outputs header of module
    cout << "\n=======================================================================\n\n";

    for(int i = 0; i < aPerson.size();)
    {
        if(leave == true) return 0;
        heading = aPerson[i].contact.substr(0,1);
        cout << "======" << heading << "=============" << endl;
        while(heading == aPerson[i].contact.substr(0,1))
        {
            cout << heading << "....." << aPerson[i].contact << endl;
            i++;

            tmp = aPerson.size() - i; //counts how many total contacts to output. Must keep count or else program crashes during comparisons in while loop
            if (tmp == 0)
            {
                leave = true;
                break;
            }
            if(aPerson[i].contact.substr(0,1) != heading) break;
        }
    }
    if(onlyNames == true) return 0;

    searchName(aPerson, SIZE);
  	system("cls");
    return 0;
}

/*
*TASK: Searches for a name the user inputs. Assumes there are names
stored and that they are either sorted or unsorted.
*ACCEPTS: (1) The vector storage to access the names
*         (2) a const int to indicate how many members are in struct Person
*RETURNS: integer 0 if aPerson vector is empty or if the string "end" is entered
*MODIFIES: nothing is modified because the function doesn't change
*the values of the vector or the number of elements; only looks for a name
*/
int searchName(vector<Person>& aPerson, const int SIZE)
{
    bool flag = false;  //bool flag used to indicate if name was found or not.
    string type;    //query type
    string* ptr; //used to point at contact struct members
    string fields[SIZE] = {"Contact: ", "Phone: ", "E-mail: ", "Address: ",  //contact info fields
                            "Birthday: ", "Organization: ", "Relationship: "};

    if(!seeIfEmpty(aPerson)) return 0;

    cout << "\nEnter a name to view the contact. Or, enter other known contact information"
    	<< "\n to view it (e.g. phone#, b-day).\n\n";
    cout << "View> "; getline(cin, type); cout << endl;
    if(type == "quit") exit(1); //if user entered "quit", the program ends.
    if(type == "end") return 0;

    for(int i = 0; i < aPerson.size(); i++) //Linear search using a pointer. Finds struct aPerson member
    {
        ptr = &aPerson[i].contact; //points at beginning of vector and its first struct memb
        for(int i2 = 0; i2 < SIZE; i2++) //increments number of times to increment ptr++ (see "HERE" comment)
        {
            if(type == *ptr)
            {
                ptr = &aPerson[i].contact; //point back to first contact;
                for(int i2 = 0; i2 < SIZE; i2++, ptr++ ) //incrementing the pointer steps through each struct member stored in the vector
                    cout << fields[i2] << *ptr << endl; //displays the matched contact
                flag = true; //indicates that the name was found
                break;
            }
            ptr++; //HERE
        }
        if(flag == true)
        {
            editContact(aPerson, i, SIZE);
            flag = false;
        }

    }

    cout << "\nEnd of search results. \n";
    pause();

    return 0;
}
/*
*TASK: allows user to edit members (change values) in aPerson vector
*ACCEPTS: (1) The vector storage for the names
*		  (2) the index value (called from searchName()) of the selected contact to edit
*         (3) a const int variable of the number of members in the Person structure
*RETURNS: integer 0 if user inputs "end" string
*MODIFIES: The size of the vector
*/
int editContact(vector<Person>& aPerson, int idx, const int SIZE)
{
    enum Fields{CONTACT, PHONE, EMAIL, ADDRESS, BDAY, ORG, RSHIP}; //represents members from 0 to 6
    string fields[SIZE] = {"Contact", "Phone", "E-mail", "Address",
                            "Birthday", "Organization", "Relationship"}; //array holds copies of Person member varaible names
    string field; //holds the user input value
	bool run = true; //allows do-while loop to continue

	if(!seeIfEmpty(aPerson)) return 0;

	do
	{
		cout << "\nChoose a field to edit it. Enter \"more\" to see more search results."
            <<"\nInput is case sensitive\n\n";
	    cout << "Edit> "; getline(cin, field);
	    if(field == "more") return 0;
	    if(field == "quit") exit(1);
	    if(field == fields[CONTACT])
	    {
	        cout << "Enter a new name: ";
	        getline(cin, aPerson[idx].contact);
	        run = false;
	    }
	    else if(field == fields[PHONE])
	    {
	        cout << "Enter a new phone #: ";
	        getline(cin, aPerson[idx].phone);
	        run = false;
	    }
	    else if(field == fields[EMAIL])
	    {
	        cout << "Enter a new E-mail: ";
	        getline(cin, aPerson[idx].email);
	        run = false;
	    }
	    else if(field == fields[ADDRESS])
	    {
	        cout << "Enter a new address: ";
	        getline(cin, aPerson[idx].house);
	        run = false;
	    }
	    else if(field == fields[BDAY])
	    {
	        cout << "Change their birthday: ";
	        getline(cin, aPerson[idx].bday);
	        run = false;
	    }
	    else if(field == fields[ORG])
	    {
	        cout << "Edit their organization: ";
	        getline(cin, aPerson[idx].org);
	        run = false;
	    }
	    else if(field == fields[RSHIP])
	    {
	        cout << "Change Relationship: ";
	        getline(cin, aPerson[idx].rShip);
	        run = false;
	    }
	    else cout << "Invalid command. Try again.";
	}while(run == true);


}

/*
*TASK: tests to see if vector is empty
*ACCEPTS: (1) The Person vector
*RETURNS: returns a bool value, true or false. True if empty, false if not.
*MODIFIES: doesn't modify anything.
*/
bool seeIfEmpty(vector<Person>& aPerson)
{
    if (aPerson.empty()) //if the list has no current entires, this is displayed
    {
        cout << "\nThere must be some name(s) in the record to do this. \n";
        pause();
        return false;
    }
    else return true; //if vector is not empty
}

/*
*TASK: prompts user to enter a command before
*continuing back to the main menu.
*ACCEPTS: no arguments accepted.
*RETURNS: nothing because function is type void.
*MODIFIES: nothing. No pass-by-references in parameters.
*/
void pause()
{
    string go; //holds input value
    do
    {
        cout << "\nEnter 'go' to continue...";
        cin >> go;
        if (go == "quit") exit(1); //if user entered "quit" string, program ends.
    }while(go != "go"); // Prompts user to enter "go" until "go" is entered.

}

/*
*TASK: Prompts user with program instructions.
*Assumes user is aware of Case Sensitive commands
*ACCEPTS: no arguments are accepted.
*RETURNS: an integer back to main() to switch. This integer is used
*to control what the program does.
*MODIFIES: nothing, as no pass-for-reference parameters are used.
*/
int mainMenu()
{
    string command;   //used to hold users input
    int choice;       //input to be returned.

    system("cls");

    cout << "=======================================================================\n";
    cout << "\t\tPHONE CONTACTS\n";
    cout << "=======================================================================\n";
    cout << "\n\tCommands: \n";

    cout << "\n\tEnter \"add\" to store a name in the record.";
    cout << "\n\tEnter \"delete\" to delete a name from record.";
    cout << "\n\tEnter \"display\" to display all names in record.";
    cout << "\n\tEnter \"sort\" for name sorting options.";
    cout << "\n\tEnter \"search\" to lookup a name.";
    cout << "\n\tEnter \"groups\" to view or create a group.";
    cout << "\n\tEnter \"files\" to open or save a file.";
    cout << "\n\tEnter \"quit\" at any prompt to exit the program.";
    cout << "\n\n\t*NOTE: all commands and input are case sensitive.\n";

    while(1) //infinitate while loop to display menu.
    {
        cout << "\nMenu> ";
        cin >> command;       //entered string is translated to integer in an if-else chain.
        cin.ignore(256, '\n');
        if (command == "add")
            choice = 1;
        else if (command == "delete") //commands entered in main function sent here and returns a int for the Switch statements
            choice = 2;
        else if (command == "display")
            choice = 3;
        else if (command == "sort")
            choice = 4;
        else if (command == "search")
            choice = 5;
        else if (command == "groups")
            choice = 6;
        else if (command == "files")
            choice = 7;
		else if (command == "quit")
            exit(1);
        else
        {
            cout << "\nInvalid command. Try again: ";
            continue;
        }
            return choice; // returns the choice of the user
    }
}