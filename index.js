const express = require("express")
const app = express()
const port = 3001
const {tblhewan} = require("./models/index")
const Sequelize = require("sequelize");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const sequelize = new Sequelize(
    "dbhewan",
    "root",
    "",
    {
      host: "localhost",
      dialect: "mysql",
    }
  );
  
  // Step 3: Membuat fungsi untuk check koneksi project ke database
  function checkConnection() {
    sequelize
      .authenticate()
      .then(() => {
        console.log(
          "Connection has been established successfully"
        );
      })
      .then(() => {
        tblhewan.sync().then(() => {
          console.log("Table Hewan created");
        });
      })
      .catch((err) => {
        console.error("Unable to connect to database: ", err);
      });
  }
  
  // Step 4: Panggil fungsi connection
  checkConnection();

app.post("/",(req,res)=>{
    res.json({message:"hello world"})
})

app.post("/inputdata",async(req,res)=>{
    const payload = {
        nama : req.body.nama,
        namaSpesies : req.body.namaSpesies,
        umur : req.body.umur
    }
    const proses = await tblhewan.create({
        nama: payload.nama,
        namaSpesies: payload.namaSpesies,
        umur: payload.umur,
    })
    if(proses){
        res.json({
            message:"Berhasil ditambahkan"
        })
    }else{
        res.json({
            message:"Tidak berhasil ditambahkan"
        })
    }
    res.json({message:"hello world"})
})
app.get("/get/:id",async(req,res)=>{
    const ambildata = await tblhewan.findAll({
        where: {
            id: req.params.id
        }
    })
    if(ambildata){
        res.json({
            message:"data ditemukan",
            ambildata
        })
    } else{
        res.json({
            message:"data tidak ditemukan",
            ambildata
        })
    }
})

app.put("/update/:id",async(req,res)=>{
    const payload = {
        nama:req.body.nama,
        namaSpesies:req.body.namaSpesies,
        umur:req.body.umur,
        
}
        const proses = await tblhewan.update({
        nama: payload.nama,
        namaSpesies: payload.namaSpesies,
        umur: payload.umur,
       
        },{
            where: {
                id: req.params.id
            }
        })
        if(proses){
            res.json({
                message:"data berhasil di update",
                payload
            })
        } else{
            res.json({
                message:"data gagal di update",
                payload
            })
        }
})

app.delete("/delete/:id",async(req,res)=>{
    const hapus= await tblhewan.destroy({
        where: {
            id: req.params.id
        }
    })
    if(hapus){
        res.json({
            message:"data di hapus"
        })
    } else{
        res.json({
            message:"data gagal di hapus"
        })
    }
})

app.get("/all",async(req,res)=>{
    try {
        const ambil=await tblhewan.findAll()
        if(ambil){
            res.json({
                message:"data ditemukan",
                ambil
            })
        } else{
            res.json({
                message:"data tidak ditemukan",
                ambil
            })
        }
        res.json({message:"hello world"})
    } catch (error) {
        res.status(400).send(error)
        
    }
})


app.listen(port, () => {
    console.log("server is listening on port", port)
})