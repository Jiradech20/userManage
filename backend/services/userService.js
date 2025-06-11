const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.getAllUsers = () => prisma.user.findMany();

exports.createUser = (data) => prisma.user.create({ data });

exports.updateUser = (id, data) =>
  prisma.user.update({ where: { id: Number(id) }, data });

exports.deleteUser = (id) => prisma.user.delete({ where: { id: Number(id) } });
