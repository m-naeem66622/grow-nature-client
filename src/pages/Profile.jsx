import React from "react";
import { useSelector } from "react-redux";
import { formatTime } from "../utils/strings";

const Profile = () => {
  const userInfo = useSelector((state) => state.auth.userInfo);

  return (
    <div className="container mx-auto p-6">
      <div className="card py-8 bordered">
        <figure>
          <img
            className="w-52 rounded-full"
            src="https://gravatar.com/avatar?s=500&d=mp"
            alt="User Avatar"
          />
        </figure>
        <div className="card-body">
          <div className="badge badge-lg badge-success mx-auto">
            {userInfo.speciality === "Plant Health Monitoring"
              ? "Plant Pythologist"
              : userInfo.role}
          </div>
          <div className="flex flex-col items-center">
            <h2 className="card-title">
              {userInfo.firstName} {userInfo.lastName}
            </h2>
            <p>{userInfo.email}</p>
            {userInfo.role === "CARETAKER" && (
              <>
                <em>{userInfo.bio}</em>
              </>
            )}
          </div>
          <div className="divider divider-vertical"></div>
          <p>
            <strong className="mr-2">Address:</strong>
            {Object.values({
              ...userInfo.address,
              createdAt: "",
              updatedAt: "",
            })
              .filter(Boolean)
              .join(", ")}
          </p>
          <p>
            <strong>Phone:</strong> {userInfo.phoneNumber}
          </p>
          {userInfo.role === "CARETAKER" && (
            <>
              <p>
                <strong>Speciality:</strong> {userInfo.speciality}
              </p>
              <p className="flex">
                <strong>Experience:</strong>
                <ul className="list-disc ml-8">
                  {userInfo.experience.map((experience, index) => (
                    <li key={index}>{experience}</li>
                  ))}
                </ul>
              </p>
              <p className="flex">
                <strong>Services:</strong>
                <ul className="list-disc ml-8">
                  {userInfo.services.map((service, index) => (
                    <li key={index}>{service}</li>
                  ))}
                </ul>
              </p>
              <p className="flex">
                <strong>Pricing:</strong>
                <ul className="list-disc ml-8">
                  {userInfo.pricing.map((pricing, index) => (
                    <li key={index}>
                      {pricing.service} - PKR {pricing.price}/-
                    </li>
                  ))}
                </ul>
              </p>
              <p className="flex">
                <strong>Availability:</strong>
                <ul className="list-disc ml-8">
                  {userInfo.availability.map((available, index) => (
                    <li key={index}>
                      {available.day} | {formatTime(available.start)} -{" "}
                      {formatTime(available.end)}
                    </li>
                  ))}
                </ul>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
