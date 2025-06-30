<div className={`${isMobile ? "ml-0" : "ml-64"} p-4 md:p-8 w-full max-w-7xl`}>
  <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
        Approve Students
      </h1>
      <div className="relative w-full md:w-64">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <FiSearch className="text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Search students..."
          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
    </div>

    {filteredStudents.length === 0 ? (
      <div className="text-center py-8">
        <p className="text-gray-500 text-lg">
          {students.length === 0
            ? "No pending student approvals found"
            : "No students match your search"}
        </p>
      </div>
    ) : (
      <div className="overflow-x-auto">
        {isMobile ? (
          // Mobile card view
          <div className="space-y-4">
            {filteredStudents.map(
              ({
                id,
                name,
                studentId,
                email,
                phone,
                batch,
                address,
                idCardUrl,
              }) => (
                <div key={id} className="border border-gray-200 rounded-lg p-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <h3 className="font-medium text-gray-900">{name}</h3>
                      <span className="text-gray-500">#{studentId}</span>
                    </div>
                    <p className="text-sm text-gray-500">{email}</p>
                    <p className="text-sm text-gray-500">Phone: {phone}</p>
                    <p className="text-sm text-gray-500">Batch: {batch}</p>
                    <p
                      className="text-sm text-gray-500 truncate"
                      title={address}
                    >
                      Address: {address}
                    </p>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    <button
                      onClick={() => approveStudent(id)}
                      className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-md transition-colors text-sm"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => deleteStudent(id)}
                      className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md transition-colors text-sm"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => toggleRow(id)}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md transition-colors text-sm"
                    >
                      {expandedRow === id ? "Hide ID" : "View ID"}
                    </button>
                  </div>

                  {expandedRow === id && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <h4 className="text-sm font-medium text-gray-900 mb-2">
                        Student ID Card
                      </h4>
                      <div className="border border-gray-200 rounded-lg overflow-hidden">
                        <img
                          src={idCardUrl}
                          alt="Student ID Card"
                          className="w-full object-contain"
                        />
                      </div>
                    </div>
                  )}
                </div>
              )
            )}
          </div>
        ) : (
          // Desktop table view
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="px-4 py-2 md:px-6 md:py-3 text-gray-700 font-medium uppercase tracking-wider">
                  #
                </th>
                <th className="px-4 py-2 md:px-6 md:py-3 text-gray-700 font-medium uppercase tracking-wider">
                  Name
                </th>
                <th className="px-4 py-2 md:px-6 md:py-3 text-gray-700 font-medium uppercase tracking-wider">
                  Student ID
                </th>
                <th className="px-4 py-2 md:px-6 md:py-3 text-gray-700 font-medium uppercase tracking-wider">
                  Email
                </th>
                <th className="px-4 py-2 md:px-6 md:py-3 text-gray-700 font-medium uppercase tracking-wider">
                  Phone
                </th>
                <th className="px-4 py-2 md:px-6 md:py-3 text-gray-700 font-medium uppercase tracking-wider">
                  Batch
                </th>
                <th className="px-4 py-2 md:px-6 md:py-3 text-gray-700 font-medium uppercase tracking-wider">
                  Address
                </th>
                <th className="px-4 py-2 md:px-6 md:py-3 text-gray-700 font-medium uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredStudents.map(
                (
                  {
                    id,
                    name,
                    studentId,
                    email,
                    phone,
                    batch,
                    address,
                    idCardUrl,
                  },
                  index
                ) => (
                  <React.Fragment key={id}>
                    <tr className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-2 md:px-6 md:py-4 whitespace-nowrap text-gray-500">
                        {index + 1}
                      </td>
                      <td className="px-4 py-2 md:px-6 md:py-4 whitespace-nowrap font-medium text-gray-900">
                        {name}
                      </td>
                      <td className="px-4 py-2 md:px-6 md:py-4 whitespace-nowrap text-gray-500">
                        {studentId}
                      </td>
                      <td className="px-4 py-2 md:px-6 md:py-4 whitespace-nowrap text-gray-500">
                        {email}
                      </td>
                      <td className="px-4 py-2 md:px-6 md:py-4 whitespace-nowrap text-gray-500">
                        {phone}
                      </td>
                      <td className="px-4 py-2 md:px-6 md:py-4 whitespace-nowrap text-gray-500">
                        {batch}
                      </td>
                      <td
                        className="px-4 py-2 md:px-6 md:py-4 text-gray-500 max-w-xs truncate"
                        title={address}
                      >
                        {address}
                      </td>
                      <td className="px-4 py-2 md:px-6 md:py-4 whitespace-nowrap space-x-2">
                        <button
                          onClick={() => confirmStudent(id)}
                          className="bg-indigo-600 hover:bg-green-700 text-white px-3 py-1 rounded-md transition-colors text-sm"
                        >
                          Confirm
                        </button>
                        <button
                          onClick={() => approveStudent(id)}
                          className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-md transition-colors text-sm"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => deleteStudent(id)}
                          className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md transition-colors text-sm"
                        >
                          Delete
                        </button>
                        <button
                          onClick={() => toggleRow(id)}
                          className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md transition-colors text-sm"
                        >
                          {expandedRow === id ? "Hide ID" : "View ID"}
                        </button>
                      </td>
                    </tr>

                    {expandedRow === id && (
                      <tr>
                        <td
                          colSpan="8"
                          className="px-4 py-2 md:px-6 md:py-4 bg-gray-50"
                        >
                          <div className="flex flex-col items-center">
                            <h3 className="text-lg font-medium text-gray-900 mb-3">
                              Student ID Card
                            </h3>
                            <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                              <img
                                src={idCardUrl}
                                alt="Student ID Card"
                                className="max-h-96 object-contain"
                              />
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                )
              )}
            </tbody>
          </table>
        )}
      </div>
    )}
  </div>
</div>;
