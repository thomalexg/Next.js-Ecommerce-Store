import { updateQuantity } from '../../util/database';

export default async function handler(req, res) {
  const id = req.query.teamMemberId;

  if (req.method === 'PATCH') {
    const updatedTeamMember = await updateQuantity(id, req.body.quantity);
    res.json(updatedTeamMember);
  }

  // if (req.method === 'DELETE') {
  //   const deletedTeamMember = await deleteProduct(id);
  //   res.json(deletedTeamMember);
  // }
}
