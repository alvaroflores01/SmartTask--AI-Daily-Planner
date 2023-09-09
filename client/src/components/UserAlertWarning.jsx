const UserAlertWarning = ({ msg }) => {
  return (
    <div className="block w-full bg-orange-200 p-2 rounded-sm text-orange-600 text-center mt-2 italic text-sm">
      {msg}
    </div>
  );
};

export default UserAlertWarning;
