

export default class ICommand
{

    run(method, sender)
    {
        if (typeof this[method] === typeof undefined) {
            console.log(`Method '${method} not found!`);
            return;
        }

        this[method]();
        sender.cancel();
    }

}
