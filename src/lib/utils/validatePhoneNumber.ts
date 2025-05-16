import { NetworkType } from "./typeConfig";

type ValidationResult = {
  network: NetworkType;
  isValid: boolean;
};

export function validatePhoneNumber(phoneNumber: string): ValidationResult {
  const numericPhoneNumber = phoneNumber.replace(/\D/g, ""); //Remove any non-numeric characters from the phone number
  const regex = /^234\d{10}$/; // Check if the number starts with '234' and is followed by 10 digits

  if (regex.test(numericPhoneNumber)) {
    return { isValid: false, network: "" };
  }

  // Extract the first 4 digits of the numeric phone number
  let prefix = numericPhoneNumber.substring(0, 4);
  const start = numericPhoneNumber.substring(0, 3);
  if (start === "234") {
    prefix = "0" + numericPhoneNumber.substring(3, 6);
  }
  //   '0916','0913','0915','0912','0819'
  // Define network prefixes
  const mtnNumbers = [
    "0916",
    "0707",
    "0913",
    "0803",
    "0806",
    "0813",
    "0810",
    "0816",
    "0814",
    "0903",
    "0906",
    "0703",
    "0704",
    "0706",
    "0702",
    "07025",
    "07026",
  ];
  const gloNumbers = ["0915", "0805", "0807", "0811", "0815", "0705", "0905"];
  const airtelNumbers = [
    "0912",
    "0802",
    "0808",
    "0812",
    "0708",
    "0701",
    "0902",
    "0904",
    "0901",
    "0907",
    "0911",
  ];
  const _9mobileNumbers = ["0809", "0817", "0818", "0908", "0909"];
  // Check which network the number belongs to
  if (mtnNumbers.includes(prefix)) {
    return { isValid: true, network: "MTN" };
  } else if (gloNumbers.includes(prefix)) {
    return { isValid: true, network: "GLO" };
  } else if (airtelNumbers.includes(prefix)) {
    return { isValid: true, network: "AIRTEL" };
  } else if (_9mobileNumbers.includes(prefix)) {
    return { isValid: true, network: "ETISALAT" };
  } else {
    // Number does not match any known network
    return { isValid: false, network: "" };
  }
}
