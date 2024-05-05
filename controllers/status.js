const { status } = require("../models");

const getallStatus = async function (req, res) {
  try {
    const data = await status.findAll();

    if (data.length == 0) {
      res.send("Belum ada status");
    }

    const result = {
      status: "ok",
      count: data.length,
      data: data,
    };

    res.json(result);
  } catch (error) {
    console.log("<<< Terjadi Kesalahan, tidak dapat menampilkan status >>>");
  }
};


const getStatusById = async function (req, res) {
  try {
    const id = req.params.id;

    const data = await status.findByPk(id);
    if (data === null) {
      return res.status(404).json({
        status: "failed",
        message: `status dengan id ${id} tidak ditemukan`,
      });
    }
    res.json({
      status: "ok",
      data: data,
    });
  } catch (error) {
    console.log("<<< Terjadi Kesalahan, tidak dapat menampilkan status >>>");
  }
};

const addStatus = async function (req, res) {
  try {
    const idUser = req.session.user_id
    const { tittle, description } = req.body;
    if (!req.file || !description) {
     return res.status(400).json({message: "Foto Atau description harus diupload"});
    }

   
    console.log("pola",tittle, description);
    const post = req.file.path;
    

    const newStatus = await status.create({
      user_id: idUser,
      tittle: tittle,
      description: description,
    });

    res.status(201).json({
      status: "ok",
      data: {
        user_id: newStatus.user_id,
        kategori: newStatus.tittle,
        description: newStatus.description,
        post: newStatus.post,
        createdAt: newStatus.createdAt,
        updatedAt: newStatus.updatedAt,
      },
    });
  } catch (error) {
    console.log(error, "<<< terjadi kesalahan");
  }
};
module.exports={
  getallStatus,
  getStatusById,
  addStatus

}