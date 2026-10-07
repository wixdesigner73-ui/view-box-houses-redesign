// Backend web module – stores Schedule-a-Visit requests.
// Set the VisitRequests collection permissions to: Insert = Admin (this code uses suppressAuth), Read = Admin.
// Then add a Wix Automation: "Item added to VisitRequests" → "Send email to team" so sales is notified.
import { Permissions, webMethod } from 'wix-web-module';
import wixData from 'wix-data';

export const submitVisitRequest = webMethod(Permissions.Anyone, async (req) => {
  const clean = (v, max = 500) => String(v || '').slice(0, max).trim();
  if (!clean(req.name) || !/^\S+@\S+\.\S+$/.test(clean(req.email))) throw new Error('Invalid request');
  return wixData.insert('VisitRequests', {
    showroom: clean(req.showroom, 60), name: clean(req.name, 120), email: clean(req.email, 160), phone: clean(req.phone, 40),
    preferredDate: req.preferredDate || null, preferredTime: clean(req.preferredTime, 30), model: clean(req.model, 80), message: clean(req.message, 1000),
    createdAt: new Date(),
  }, { suppressAuth: true });
});
