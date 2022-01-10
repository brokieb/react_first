import axiosInstance from "/app/lib/axiosInstance";
import Email from "email-templates";
import { useState } from "react";
export default function smtpTest() {
  // axiosInstance.post("/api/email/postEmail", {
  //     to: 'test@o2.pl',
  //     template: 'welcome',
  //     test: 'true'
  // }).then(item => {
  //     return true;
  // }).catch(() => {
  //     return false;
  // })
  return true;
}
