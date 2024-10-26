import Account from "../../models/account.model.js";

const accountController = {
  // [GET] client/account/details/:id
  showDetailsInfo: async (req, res) => {
    try {
      const client = await Account.findById(req.params.id);

      res.status(200).json(client);
    } catch (err) {
      res.status(500).json(false);
    }
  },

  // [PATCH] client/account/details/:id
  updateDetailsInfo: async (req, res) => {
    try {
      const allowedUpdates = [
        "password",
        "firstName",
        "lastName",
        "email",
        "phoneNumber",
        "dateOfBirth",
      ];
      const updates = Object.keys(req.body);
      const isValidOperation = updates.every((update) =>
        allowedUpdates.includes(update)
      );

      if (!isValidOperation) {
        return res.status(400).json(true);
      }

      const client = await Account.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });

      res.status(200).json(client);
    } catch (err) {
      res.status(500).json(false);
    }
  },
};

export default accountController;
