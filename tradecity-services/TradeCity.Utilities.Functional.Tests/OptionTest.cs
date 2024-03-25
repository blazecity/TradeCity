namespace TradeCity.Utilities.Functional.Tests;

[TestClass]
public class OptionTest
{
    [TestMethod]
    public void TestNone()
    {
        // Arrange
        Option<byte> option = Option.None();

        // Act
        var isNone = option.IsNone();
        var isSome = option.IsSome();

        // Assert
        Assert.IsTrue(isNone);
        Assert.IsFalse(isSome);
    }

    [TestMethod]
    public void TestSome()
    {
        // Arrange
        var option = Option.Some(1);
        
        // Act
        var isNone = option.IsNone();
        var isSome = option.IsSome();
        
        // Assert
        Assert.IsFalse(isNone);
        Assert.IsTrue(isSome);
    }

    [TestMethod]
    public void TestUnwrapOrWithValue()
    {
        // Arrange
        var option = Option.Some(1);
        
        // Act
        var actual = option.UnwrapOr(() => 2);
        
        // Assert
        const int expected = 1;
        Assert.AreEqual(expected, actual);
    }

    [TestMethod]
    public void TestUnwrapOrNone()
    {
        // Arrange
        Option<int> option = Option.None();
        
        // Act
        var actual = option.UnwrapOr(() => 2);
        
        // Assert
        const int expected = 2;
        Assert.AreEqual(expected, actual);
    }

    [TestMethod]
    public void TestMatchWithValue()
    {
        // Arrange
        var option = Option.Some(1);
        
        // Act
        var actual = option.Match(
            some => some,
            () => 2
        );

        // Assert
        const int expected = 1;
        Assert.AreEqual(expected, actual);
    }
    
    [TestMethod]
    public void TestMatchNone()
    {
        // Arrange
        Option<byte> option = Option.None();
        
        // Act
        var actual = option.Match(
            some => some,
            () => 2
        );

        // Assert
        const int expected = 2;
        Assert.AreEqual(expected, actual);
    }
}