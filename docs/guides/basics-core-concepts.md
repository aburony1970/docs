---
title: "Basics: Core Concepts" 
---

# Core Concepts

Redux is a single API making it simple to perform various features within WordPress. We will go over a our basic concepts 
so you can properly grasp how Redux works.

::: warning Table of Contents
[[toc]]
:::

## Never modify core files!
Redux is extremely extensible, which means you can override anything using filters. You will never find a need to modify 
a core file unless your helping us to solve a bug. 	__***NEVER***__ **modify anything inside of ReduxCore**. If you want to change how 
a field works, build an extension instead. Need to modify a value when it's saved? Use a filter.

::: danger Why is modifying ReduxCore files a bad practice when embedded in my own product?
Redux is built to run with only one version of the framework code. If you modify core files in your version, which you 
embed in a product, there's no garanteee that your version will be the version loaded should another product be using Redux. 
This can cause conflicts and headaces for you and your clients. By using filters and extensions, you ensure that your 
code will always be loaded despite the "core" that is instantiated first.
:::

## Object Structure
First we need to understand the object structure of Redux so we can understand how everything fits together.

### Field
The lowest building block is a [field](../configuration/object-field.md). A [field](../configuration/object-field.md) is what is 
displayed for a user to input data into. It has it's own set of characteristics depending on the [field type](../core-fields). 
At this level, whatever args are set to the [field](../configuration/object-field.md) act as an override for all levels above.

### Section
A [section](../configuration/object-section.md) is quite simply a grouping of [fields](../configuration/object-field.md). It can 
group everything together into it's own package. It has a number of arguments that can be passed down to the [fields](../configuration/object-field.md) 
below, provided the [fields](../configuration/object-field.md) below do not specify those same arguments on their own declaration. 
Again, the [fields](../configuration/object-field.md) level args override all.

### Box
In some cases, such as is with [metaboxes](../core-extensions/metaboxes-lite.md), an extra grouping is required. Hence a box. A box is simply a container with a bunch 
of [sections](../configuration/object-section.md) within it. The primary purpose of a box is placement on the screen.

### Instance
Instance level arguments are known as [global arguments](../configuration/arguments-global.md). They impact all areas of 
the instance. Typically these are arguments that affect how Redux performs, but they can set an entire instance to display
a control panel in the [customizer only](../configuration/arguments-global.md#customizer-only). If you're not sure what's
going on, the problem may be in the [global args](../configuration/arguments-global.md).

Remember, there can be multiple instances running in a single WordPress install. This means that all products based on
Redux, be it plugins or the theme can be running at once without imacting one another.

## Arguments
Every object has arguments and every level of nested objects can inherit or override those arguments. When looking at an 
argument, make sure you're thinking of how it will impact all the nested items below it (children).

### Global Arguments
[Global arguments](../configuration/arguments-global.md) are those arguments which affect every field or how your 
instance of Redux performs. These arguments can [enable/disable the customizer](../configuration/arguments-global.md#customizer-only) 
by default, change the [menu title](../configuration/arguments-global.md#menu-title), and set 
fields to [automatically output CSS](../configuration/arguments-global.md#output) or not. For a more detailed breakdown, 
visit our [Global Arguments](../configuration/arguments-global.md) page as well as the docs releated to each field and setting.

### `opt_name`, your unique instance key
One of the most important global variables is your [opt_name](../configuration/arguments-global.md#opt-name). This is a 
unique key to distinguish your Redux instance from all others. It's also where your data is stored in the database and, 
if you are using the global variable, how you access data within your code.

::: tip Choose an uncommon `opt_name` to avoid issues
If two instances of Redux use the same `opt_name`, they will only override one another's settings in order of occurance. 
It is crucial that you pick a unqiue string for your product.
:::