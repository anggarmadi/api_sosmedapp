const { comment } = require("../models");

const getAllComment = async function (req, res) {
  try {
    const data = await comment.findAll();

    if (data.length == 0) {
      res.send("Belum ada comment");
    }

    const result = {
      status: "ok",
      count: data.length,
      data: data,
    };

    res.json(result);
  } catch (error) {
    console.log("<<< Terjadi Kesalahan, tidak dapat menampilkan comment >>>");
  }
};


const getCommentById = async function (req, res) {
  try {
    const id = req.params.id;

    const data = await comment.findByPk(id);
    if (data === null) {
      return res.status(404).json({
        status: "failed",
        message: `comment dengan id ${id} tidak ditemukan`,
      });
    }
    res.json({
      status: "ok",
      data: data,
    });
  } catch (error) {
    console.log("<<< Terjadi Kesalahan, tidak dapat menampilkan comment >>>");
  }
};

module.exports={
getAllComment,
getCommentById
}