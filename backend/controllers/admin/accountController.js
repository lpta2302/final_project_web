import account from "../../models/account.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"; // Thêm dòng này để sử dụng JWT
const secretKey = "your-secret-key"; // Khóa bí mật để ký JWT, bạn nên lưu khóa này ở file .env

const accountController = {
  // [POST] /auth/register
  register: async (req, res) => {
    try {
      const isAccount = await account.findOne({ email: req.body.email });

      if (isAccount) {
        return res.status(400).json({
          code: 400,
          message: "Email đã tồn tại",
        });
      } else {
        // Mã hóa mật khẩu trước khi lưu
        const saltRounds = 10; // Số rounds salt
        const hashedPassword = await bcrypt.hash(req.body.password, saltRounds); // Mã hóa mật khẩu

        const _account = new account({
          ...req.body,
          password: hashedPassword,
        });

        await _account.save();

        // Tạo JWT
        const token = jwt.sign(
          { id: _account._id, email: _account.email },
          secretKey,
          {
            expiresIn: "1h", // Token sẽ hết hạn sau 1 giờ
          }
        );

        res.status(200).json({
          code: 200,
          message: "Đăng ký thành công",
          token: token,
        });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({
        code: 500,
        message: "Đã có lỗi xảy ra trong quá trình đăng ký",
      });
    }
  },

  // [POST] // Route for login
  accountLogin: async (req, res) => {
    try {
      const { username, password } = req.body;

      const _account = await account.findOne({ username });

      if (!_account) {
        return res
          .status(400)
          .json("Tài khoản không tồn tại. Vui lòng tiến hành đăng ký");
      }

      const isMatch = await bcrypt.compare(password, _account.password);

      if (isMatch && _account.accountStatus == "active") {
        if (account.accountRole == "client") {
          return res.status(200).json("Bạn đăng nhập thành công.");
        } else {
          return res
            .status(200)
            .json("Chào mừng ngài quay trở lại, administrator");
        }
      } else {
        return res.status(400).json("Sai Mật Khẩu. Vui lòng nhập lại");
      }
    } catch (err) {
      res
        .status(500)
        .json("Quá trình đăng nhập thất bại, vui lòng thử lại. " + err);
    }
  },

  // For manage account of client.
  // [GET] // Hiển thị danh sách các tài khoản
  showAccount: async (req, res) => {
    try {
      const listAccount = await account.find();
      res.status(200).json(listAccount);
    } catch (err) {
      res
        .status(500)
        .json(
          "Không thể hiển thị danh sách tài khoản, vui lòng thử lại. " + err
        );
    }
  },

  // [GET] // Xem chi tiết thông tin tài khoản
  accountDetails: async (req, res) => {
    try {
      const accountCode = req.params.accountCode;
      const accountDetail = await account.findOne({ accountCode: accountCode });
      res.status(200).json(accountDetail);
    } catch (err) {
      res
        .status(500)
        .json(
          "Không thể hiển thị chi tiết tài khoản, vui lòng thử lại. " + err
        );
    }
  },

  // [PATCH] // Chỉnh sửa trạng thái của tài khoản
  accountUpdateStatus: async (req, res) => {
    try {
      const accountDetails = await account.findOne({
        accountCode: req.params.accountCode,
      });

      const accountStatus = await accountDetails.updateOne({
        accountStatus: req.body.accountStatus,
      });

      res.status(200).json(accountStatus);
    } catch (err) {
      res
        .status(500)
        .json(
          "Không thể cập nhật trạng thái tài khoản, vui lòng thử lại. " + err
        );
    }
  },

  // [DELETE] // Xóa tài khoản
  deleteAccount: async (req, res) => {
    try {
      const result_Delete = await account.deleteOne({
        accountCode: req.params.accountCode,
      });

      res.status(200).json("Đã xóa thành công" + result_Delete);
    } catch (err) {
      res.status(500).json("Quá trình xóa gặp lỗi, vui lòng thử lại. " + err);
    }
  },

  // [GET] // Tìm kiếm tài khoản
  searchAccount: async (req, res) => {
    try {
      // Tìm kiếm theo username
      const search = req.query.search || "";
      console.log("Search Term: ", search);

      // Dùng cho đk lọc
      let sort = req.query.sort || "accountCode";
      let status = req.query.status || "All";
      let role = req.query.role || "All";

      const statusOptions = ["active", "inactive"];
      const roleOptions = ["admin", "client"];

      status === "All" ? (status = [...statusOptions]) : (status = "active");
      role === "All" ? (role = [...roleOptions]) : (role = "client");

      // Ví dụ nếu ?sort=accountCode,desc ==> nó thành: sort = ["accountCode", "desc"]
      req.query.sort ? (sort = req.query.sort.split(",")) : (sort = [sort]);

      // Nếu sort có nhiều phần tử (ví dụ: ["accountCode", "desc"]) ==> đã chỉ định trường và thứ tự sắp xếp.
      // ==> sẽ gán giá trị thứ hai (tức là thứ tự sắp xếp) vào sortBy.
      // ==> Điều này giúp xác định cách mà dữ liệu sẽ được sắp xếp, dựa trên yêu cầu của người dùng.
      let sortBy = {};
      if (sort[1]) {
        sortBy[sort[0]] = sort[1];
      } else {
        sortBy[sort[0]] = "asc"; // default là sx tăng dần
      }

      const _accounts = await account
        .find({
          username: { $regex: search, $options: "i" },
        })
        .where("accountStatus")
        .in([...status])
        .where("accountRole")
        .in([...role])
        .sort(sortBy);

      res.status(200).json(_accounts);
    } catch (err) {
      res.status(500).json("Quá trình tìm kiếm xảy ra lỗi, vui lòng thử lại.");
    }
  },
};

export default accountController;
