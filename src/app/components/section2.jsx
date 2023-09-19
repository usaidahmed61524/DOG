"use client";
import "./styles/section2.css";
import dogIma2 from "../images/dog2.png";
import Image from "next/image";

const Section2 = () => {
  return (
    <div className="section2Container">
      <div className="disflexsection2">
        <div className="left1">
          <div className="messageImagContainer2">
            <div className="contentMessage">
              <h2>Doges love memes</h2>
              <p>
                Dogecoin started as a meme and evolved to be so much more!
                Inspired by that the first product by Doge Art Club is the NFT
                Meme Generator
                <br />
                It s a tool to empower creative individuals to easily turn their
                art into NFTs without a single line of code and for free!
              </p>
            </div>
          </div>
          <div className="btn btn-lg btn-color-yellow mt-4">PROOF OF MEME</div>
        </div>

        <div className="right1">
          <Image src={dogIma2} alt="dog image" className="dog2image" />
        </div>
      </div>
    </div>
  );
};

export default Section2;
