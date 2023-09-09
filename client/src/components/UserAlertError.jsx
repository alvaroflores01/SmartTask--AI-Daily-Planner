const UserAlertError = ({ msg }) => {
  return (
    <div className="block w-full bg-red-300 p-2 rounded-sm text-red-500 text-center mt-2 italic text-sm">
      {msg}
    </div>
  );
};

export default UserAlertError;
