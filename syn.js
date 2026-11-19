/** 
 * in Node.js file operations done in 3 ways:
 * 1. Synchronous 2. Asynchronous 3. promise

1. Synchronous: In this method, the code execution is blocked until the file operation is completed. 
    It is simple to use but can lead to performance issues if used in a server environment. 
    readFileSync
     syntax: fs.readFileSync(file ,[options])
    writeFileSync
     Syntax: fs.writeFileSync(file, data, [options])
    appendFileSync
     Syntax: fs.appendFileSync(file, data, [options])
    unlinkSync
     Syntax: fs.unlinkSync(file)


2. Asynchronous: In this method, the code execution continues while the file operation is being performed.
    It is more efficient and suitable for server environments. 
    readFile   
     Syntax: fs.readFile(file, [options], callback)
    writeFile
     Syntax: fs.writeFile(file, data, [options], callback)
    appendFile
     Syntax: fs.appendFile(file, data, [options], callback) 
    unlink
     Syntax: fs.unlink(file, callback)


3. Promise: In this method, the file operations return a promise, allowing for the use of async/await syntax.
    readFile
     Syntax: fs.promises.readFile(file, [options])
    writeFile
     Syntax: fs.promises.writeFile(file, data, [options])
    appendFile
     Syntax: fs.promises.appendFile(file, data, [options])
    unlink
     Syntax: fs.promises.unlink(file)   
 */
    // Synchronous file operations:
    import fs from "fs";
     const data = "This is a sample text file created using  synchronous file operations in Node.js.";
     fs.writeFileSync("sample.txt", data,'utf-8');
     console.log("File created successfully using synchronous file operations.");


     const readData = fs.readFileSync("sample.txt", "utf-8");
     console.log("file read successfully using synchronous file operations.");
     console.log(readData);
     console.log("end of synchronous file operations");

    const AppendedData = "This is additional data appended to the file using synchronous file operations.";
     fs.appendFileSync("sample.txt", AppendedData, "utf-8");
     console.log("\n Data appended successfully using synchronous file operations.");  

     /* Delete a file

     const deletedFile = "sample.txt";
     fs.unlinkSync(deletedFile);
     console.log("File deleted successfully using synchronous file operations.");
     */