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

const addComment = async function (req, res) {
  try {
    const user_id = 2
    const status_id = req.params.status_id
    const {komen} = req.body;

    const newcomment = await comment.create({ user_id: user_id,
      comment: komen,
      status_id: status_id,

     });

    res.status(201).json({
      status: "ok",
      data: {
        comment: newcomment.comment,
        user_id: newcomment.user_id,
        status_id: newcomment.status_id,
        createdAt: newcomment.createdAt,
        updatedAt: newcomment.updatedAt,
      },
    });
  } catch (error) {
    console.log(error, "<<< terjadi kesalahan");
  }
};


const deleteComment = async function (req, res) {
  try {
    const id = req.params.id;

    const data = await comment.findByPk(id);

    if (!data) {
      return res.status(404).json({
        status: "failed",
        message: `Comment dengan id ${id} tidak ditemukan`,
      });
    }

    data.destroy();
    res.json({
      status: "ok",
      message: `Berhasil menghapus status dengan id ${id}`,
    });
  } catch (error) {
    console.log(error, "<<< terjadi kesalahan");
  }
};
module.exports={
getAllComment,
getCommentById,
addComment,
deleteComment
}