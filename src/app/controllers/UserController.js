import * as Yup from 'yup';
import User from '../models/User';

class UserController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      password: Yup.string().required(),
      cpf: Yup.string().required(),
      birth: Yup.string().required(),
    });

    /**
     * Verificando se o body bate com o schema
     */

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'A validação falhou' });
    }

    const newUser = await User.create(req.body);

    return res.json(newUser);
  }
}

export default new UserController();
