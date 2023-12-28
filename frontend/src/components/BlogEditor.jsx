import React from "react";
import { Link } from "react-router-dom";
import logo from "../images/logo.png";
import PageAnimation from "./PageAnimation";
import defaultBanner from "../images/logo.png";

const BlogEditor = () => {

    const handleBannerUpload = (e) => {
        console.log(e)
        let image = e.target.files[0]

        console.log(image)
    }
  return (
    <>
      <nav className="navbar">
        <Link to={"/"} className="flex-none w-24">
          <img src={logo} alt="" className="" />
        </Link>

        <p className="max-md:hidden text-black line-clamp-1 w-full">New Blog</p>

        <div className="flex gap-4 ml-auto">
          <button className="btn-dark py-2">Publish</button>

          <button className="btn-light py-2">Save Draft</button>
        </div>
      </nav>

      <PageAnimation>
        <section>
          <div className="mx-auto  max-w-[900px] w-full ">
            <div className="relative aspect-video bg-white border-4 border-grey hover:opacity-80">
              <label htmlFor="uploadBanner">
                <span className="flex items-center justify-center text-center h-[100%] text-grey hover:text-dark-grey font-bold text-3xl">Upload Banner</span>
                <input
                  id="uploadBanner"
                  type="file"
                  accept=".png, .jpeg, .jpg"
                  hidden
                  onChange={handleBannerUpload}
                />
              </label>
            </div>
          </div>
        </section>
      </PageAnimation>
    </>
  );
};

export default BlogEditor;
