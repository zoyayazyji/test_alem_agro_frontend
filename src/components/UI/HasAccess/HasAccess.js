const HasAccess = ({allowed, children}) => {
  return allowed ? children : null;
};

export default HasAccess;