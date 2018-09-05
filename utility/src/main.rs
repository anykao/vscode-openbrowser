#[macro_use]
extern crate structopt;

use structopt::StructOpt;

#[derive(StructOpt, Debug)]
#[structopt(name = "utility")]
/// vscode utility
enum Opt {
    #[structopt(name = "generate")]
    /// generate
    Generate { input: String },
    #[structopt(name = "convert")]
    /// convert
    Convert { input: String },
}
fn main() {
    let opt = Opt::from_args();
    println!("{:?}", opt);
}
