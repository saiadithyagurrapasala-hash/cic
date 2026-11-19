
     import fs from "fs";
     const Data1 = "This is a sample text file created using asynchronous file operations. ";
     console.log("before writing");
     fs.writeFile("sample.txt", Data1 , "utf-8", (err) => {
         if (err) throw err;
         console.log("File created successfully using asynchronous file operations.");
         fs.readFile("sample.txt", "utf-8", (err, readData) => {
            if (err) {
                console.log("Error reading file:", err);
                return;
            }
            console.log("file read successfully using asynchronous file operations.");
            console.log(readData);
            const AppendeData = "The data appended to the file using asynchronous file operations.";
            fs.appendFile("sample.txt", AppendeData, "utf-8", (err) => {
                if (err) throw err;
                console.log("Data appended successfully using asynchronous file operations.");
            });
        });
        console.log("completed writing file using asynchronous file operations");
});                                                                                                                                      
    
    /*const deletedFile = "sample.txt";
    fs.unlink(deletedFile, (err) => {
        if (err) {
            console.log("Error deleting file:", err);
            return;
        }
        console.log("File deleted successfully using asynchronous file operations.");
    });*/