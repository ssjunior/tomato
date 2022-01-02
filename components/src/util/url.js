let protocolAndDomainRE = /^(?:\w+:)?\/\/(\S+)$/;
let localhostDomainRE = /^localhost[:?d]*(?:[^:?\d]\S*)?$/;
let nonLocalhostDomainRE = /^[^\s.]+\.\S{2,}$/;

export const isUrl = (url) => {
  if (typeof url !== "string") {
    return false;
  }

  var match = url.match(protocolAndDomainRE);
  if (!match) {
    return false;
  }

  var everythingAfterProtocol = match[1];
  if (!everythingAfterProtocol) {
    return false;
  }

  if (
    localhostDomainRE.test(everythingAfterProtocol) ||
    nonLocalhostDomainRE.test(everythingAfterProtocol)
  ) {
    return true;
  }

  return false;
};
