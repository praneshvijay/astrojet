
const {spawn} = require("child_process");
  
async function verifycertificates(req, res) {
    try {

        console.log("Inside verifycertificates");
        console.log("req.body", req.body.items);
      const  adults  = req.body.items;
      var pythonscript = process.env.PWD +"/controllers/"+ "verifier.py";
      
    
      let data = `https://res.cloudinary.com/dn54ixooo/image/upload/w_600,h_900,c_fill,q_100/${adults[0].cowinCertificate.public_id}.jpg `+adults[0].fname + " " + adults[0].lname;
      console.log("argv = ",data);
      const pyProg = spawn('python3', [pythonscript].concat(data));
  
      // Collect data from script and print to console
      let output = '';
      pyProg.stdout.on('data', (stdout) => {
        output += stdout.toString();
      });
     
    
      // Print errors to console, if any
      pyProg.stderr.on('data', (stderr) => {
        console.log(`stderr: ${stderr}`);
      });
      
      // When script is finished, print collected data
      pyProg.on('close', (code) => {
        console.log(`child process exited with code ${code}`);   
        if (code === 0)
        {
            console.log("status = ", 200);
            res.status(200).json({"name":req.body.items[0].fname});

        }
        else
        {
          console.log("status =", 201);
            res.status(201).json({"name":data});
        }

      });
  
     
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
};


module.exports = {verifycertificates}


