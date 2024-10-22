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
        return res.status(400).json(false);
      } else {
        // Mã hóa mật khẩu trước khi lưu
        const saltRounds = 10; // Số rounds salt
        const hashedPassword = await bcrypt.hash(req.body.password, saltRounds); // Mã hóa mật khẩu

        const emailPrefix = req.body.email.slice(0, 4);

        const now = new Date();
        const timeString = `${now.getHours()}${now.getMinutes()}${now.getSeconds()}`;

        // Tạo accountCode
        const accountCode = `ACC_${emailPrefix}${timeString}`;

        const _account = new account({
          ...req.body,
          password: hashedPassword,
          accountCode: accountCode, // Gắn accountCode vào req.body
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

        res.status(200).json(token);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json(false);
    }
  },

  // [POST] // Route for login
  accountLogin: async (req, res) => {
    try {
      const { username, password } = req.body;

      const _account = await account.findOne({ username });

      if (!_account) {
        return res.status(400).json(false);
      }

      const isMatch = await bcrypt.compare(password, _account.password);

      if (isMatch && _account.accountStatus == "active") {
        if (_account.accountRole == "client") {
          return res.status(200).json(_account);
        } else {
          return res.status(200).json(_account);
        }
      } else {
        return res.status(400).json(false);
      }
    } catch (err) {
      res.status(500).json(false);
    }
  },

  // For manage account of client.
  // [GET] // Hiển thị danh sách các tài khoản
  showAccount: async (req, res) => {
    try {
      const listAccount = await account.find();
      res.status(200).json(listAccount);
    } catch (err) {
      res.status(500).json(false);
    }
  },

  // [GET] // Xem chi tiết thông tin tài khoản
  accountDetails: async (req, res) => {
    try {
      const accountCode = req.params.accountCode;
      const accountDetail = await account.findOne({ accountCode: accountCode });
      res.status(200).json(accountDetail);
    } catch (err) {
      res.status(500).json(false);
    }
  },

  // [PATCH] // Chỉnh sửa trạng thái của tài khoản
  accountUpdateStatus: async (req, res) => {
    try {
      const updatedAccount = await account.findOneAndUpdate(
        { accountCode: req.params.accountCode }, // Điều kiện tìm kiếm
        { accountStatus: req.body.accountStatus }, // Cập nhật giá trị
        { new: true } // Trả về document đã được cập nhật
      );

      res.status(200).json(updatedAccount);
    } catch (err) {
      res.status(500).json(false);
    }
  },

  // [DELETE] // Xóa tài khoản
  deleteAccount: async (req, res) => {
    try {
      const result_Delete = await account.deleteOne({
        accountCode: req.params.accountCode,
      });

      res.status(200).json(true);
    } catch (err) {
      res.status(500).json(false);
    }
  },

  // [GET] // Tìm kiếm tài khoản
  searchAccount: async (req, res) => {
    try {
      // Tìm kiếm theo username
      const search = req.query.search || "";

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
          $or: [
            { username: { $regex: search, $options: "i" } },
            { accountCode: { $regex: search, $options: "i" } },
          ],
        })
        .where("accountStatus")
        .in([...status])
        .where("accountRole")
        .in([...role])
        .sort(sortBy);

      res.status(200).json(_accounts);
    } catch (err) {
      res.status(500).json(false);
    }
  },
};

export default accountController;
