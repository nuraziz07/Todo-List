const Skeleton = () => {
    return (
        <div
            className={"flex items-center gap-3 py-3.5 px-4 rounded-xl bg-[rgba(255,255,255,0.03)] border-[0.5px] border-solid border-[rgba(255,255,255,0.07)]"}>
            <div className="skeleton w-5 rounded-md h-2.5"></div>
            <div className="skeleton w-62.5 rounded-md h-2.5"></div>
        </div>
    );
};

export default Skeleton;